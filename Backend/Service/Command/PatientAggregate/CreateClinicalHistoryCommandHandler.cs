using Domain.Entities.DoctorAggregate;
using Domain.Entities.Options;
using Domain.Entities.PatientAggregate;
using Domain.Entities.NotificationAggregate; // 👈 NUEVO: Namespace de tu entidad
using MediatR;
using Microsoft.AspNetCore.Http;
using Service.Command.UtilsAggregate;
using Service.Notifications;
using System.Security.Claims;

namespace Service.Command.PatientAggregate
{
    public class CreateClinicalHistoryCommandHandler : IRequestHandler<CreateClinicalHistoryCommand, ResponseGenericCommand<Unit>>
    {
        private readonly IPatientRepository _repository;
        private readonly IDoctorRepository _repositoryDoctor;
        private readonly IOptionsRepository _repositoryOptions;
        private readonly INotificationRepository _repositoryNotification; // 👈 NUEVO
        private readonly FirebaseNotificationService _firebase;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CreateClinicalHistoryCommandHandler(IPatientRepository repository,
                                                   FirebaseNotificationService firebase,
                                                   IDoctorRepository repositoryDoctor,
                                                   IOptionsRepository repositoryOptions,
                                                   INotificationRepository repositoryNotification, // 👈 NUEVO
                                                   IHttpContextAccessor httpContextAccessor)
        {
            _firebase = firebase;
            _repository = repository;
            _repositoryDoctor = repositoryDoctor;
            _repositoryOptions = repositoryOptions;
            _repositoryNotification = repositoryNotification; // 👈 NUEVO
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ResponseGenericCommand<Unit>> Handle(CreateClinicalHistoryCommand request, CancellationToken cancellationToken)
        {
            var response = new ResponseGenericCommand<Unit>();
            try
            {
                var userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                {
                    response.Message = "No se pudo identificar al usuario (Token inválido)";
                    response.HttpCode = "401";
                    return response;
                }

                var record = await _repository.FindByAuthUserIdAsync(userId);
                var motiveText = "";
                if (request.OptionId == 0)
                {
                    motiveText = request.Motive;
                }
                else
                {
                    var t = await _repositoryOptions.FindByIdAsyncAsnoTraking(request.OptionId);
                    motiveText = t.Description;
                }

                DateTime myDate = DateTime.UtcNow;
                if (request.DateQuery != null)
                {
                    var boliviaTimeZone = TimeZoneInfo.FindSystemTimeZoneById("America/La_Paz");
                    var localDate = DateTime.SpecifyKind(request.DateQuery.Value, DateTimeKind.Unspecified);
                    myDate = TimeZoneInfo.ConvertTimeToUtc(localDate, boliviaTimeZone);
                }

                record.CreateClinicHistory(request.DoctorId, myDate,
                    motiveText,
                    request.Diagnostic,
                    request.Observations, request.TotalCost, request.WasPaid);

                _repository.Update(record);

                // Guardamos la cita médica en la BD
                bool result = await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

                if (result)
                {
                    var doctor = await _repositoryDoctor.FindDoctorWithDevicesAsync(request.DoctorId);
                    string titulo = "Nueva Cita Agendada";
                    string mensaje = $"Hola Dr. {doctor.LastName}, tiene una nueva cita de {motiveText} para el {myDate:dd/MM/yyyy HH:mm}.";

                    // ====================================================================
                    // 👈 NUEVO: INSERT EN LA BASE DE DATOS DE LA NOTIFICACIÓN
                    // ====================================================================
                    try
                    {
                        if (doctor != null)
                        {
                            // Usamos el método de factoría estático que creamos en tu entidad
                            var dbNotification = Notification.CreateNotification(
                                targetUserId: doctor.AuthUserId,      // El doctor que recibe (nAuthUserId)
                                senderUserId: userId,                 // El paciente que crea la cita
                                title: titulo,
                                message: mensaje,
                                type: "NEW_APPOINTMENT",
                                actionUrl: record.Id.ToString()       // Guardamos el ID del historial / paciente como referencia
                            );

                            _repositoryNotification.Add(dbNotification);

                            // Si comparten el mismo DbContext/UnitOfWork, se guardará aquí.
                            // Si es un repositorio aislado, puedes llamar a su propio Save o dejar que el flujo lo maneje.
                            await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);
                        }
                    }
                    catch (Exception ex)
                    {
                        // Log local para que un fallo en la tabla de alertas no rompa el flujo principal
                        Console.WriteLine($"⚠️ Error guardando notificación en BD: {ex.Message}");
                    }
                    // ====================================================================

                    // Tu lógica existente de Firebase Push (se mantiene intacta)
                    try
                    {
                        if (doctor?.AuthUser?.Devices != null && doctor.AuthUser.Devices.Any())
                        {
                            foreach (var device in doctor.AuthUser.Devices.Where(x => !string.IsNullOrEmpty(x.DeviceToken)))
                            {
                                await _firebase.SendAsync(
                                    device.DeviceToken,
                                    titulo,
                                    mensaje,
                                    new Dictionary<string, string> { { "type", "NEW_APPOINTMENT" }, { "patientId", record.Id.ToString() } }
                                );
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"⚠️ Error enviando notificación: {ex.Message}");
                    }

                    response.Message = "Cita Registrada Exitosamente";
                    response.Code = "COD001";
                    response.HttpCode = "200";
                    response.Data = Unit.Value;
                }
                else
                {
                    response.Message = "No se pudieron guardar los cambios en la base de datos";
                    response.HttpCode = "500";
                }
            }
            catch (Exception ex)
            {
                response.Message = "Error interno al procesar el registro del dispositivo";
                response.Error = ex.Message;
                response.HttpCode = "500";
            }

            return response;
        }
    }
}