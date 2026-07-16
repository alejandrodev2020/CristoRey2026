using Domain.Entities.DoctorAggregate;
using Domain.Entities.NotificationAggregate;
using Domain.Entities.Options;
using Domain.Entities.PatientAggregate;
using MediatR;
using Microsoft.AspNetCore.Http;
using Service.Command.UtilsAggregate;
using Service.Notifications;
using System.Security.Claims;

namespace Service.Command.DoctorAggregate
{
    public class CreateClinicalHistoryByDoctorCommandHandler : IRequestHandler<CreateClinicalHistoryByDoctorCommand, ResponseGenericCommand<Unit>>
    {
        private readonly IPatientRepository _repository;
        private readonly IDoctorRepository _repositoryDoctor;
        private readonly IOptionsRepository _repositoryOptions;
        private readonly INotificationRepository _repositoryNotification;
        private readonly FirebaseNotificationService _firebase;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CreateClinicalHistoryByDoctorCommandHandler(IPatientRepository repository,
                                                           IDoctorRepository repositoryDoctor,
                                                           IOptionsRepository repositoryOptions,
                                                           INotificationRepository repositoryNotification,
                                                           FirebaseNotificationService firebase,
                                                           IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _repositoryDoctor = repositoryDoctor;
            _repositoryOptions = repositoryOptions;
            _repositoryNotification = repositoryNotification;
            _firebase = firebase;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ResponseGenericCommand<Unit>> Handle(CreateClinicalHistoryByDoctorCommand request, CancellationToken cancellationToken)
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

                var doctor = await _repositoryDoctor.FindByAuthUserIdAsync(userId);
                if (doctor == null || doctor.IsActive != true)
                {
                    response.Message = "No se encontró un doctor activo para el usuario autenticado";
                    response.HttpCode = "404";
                    return response;
                }

                var patient = await _repository.FindPatientWithDevicesAsync(request.PatientId);
                if (patient == null || patient.IsActive != true)
                {
                    response.Message = "El paciente indicado no existe o no se encuentra activo";
                    response.HttpCode = "404";
                    return response;
                }

                if (!request.DateQuery.HasValue)
                {
                    response.Message = "DateQuery es obligatorio";
                    response.HttpCode = "400";
                    return response;
                }

                string motiveText;
                if (request.OptionId == 0)
                {
                    if (string.IsNullOrWhiteSpace(request.Motive))
                    {
                        response.Message = "Motive es obligatorio cuando no se envía OptionId";
                        response.HttpCode = "400";
                        return response;
                    }

                    motiveText = request.Motive;
                }
                else
                {
                    var option = await _repositoryOptions.FindByIdAsyncAsnoTraking(request.OptionId);
                    if (option == null)
                    {
                        response.Message = "El OptionId indicado no existe";
                        response.HttpCode = "400";
                        return response;
                    }

                    motiveText = option.Description;
                }

                var boliviaTimeZone = TimeZoneInfo.FindSystemTimeZoneById("America/La_Paz");
                var localDate = DateTime.SpecifyKind(request.DateQuery.Value, DateTimeKind.Unspecified);
                var dateQueryUtc = TimeZoneInfo.ConvertTimeToUtc(localDate, boliviaTimeZone);

                if (dateQueryUtc <= DateTime.UtcNow)
                {
                    response.Message = "La fecha de la cita debe ser posterior a la fecha y hora actual";
                    response.HttpCode = "400";
                    return response;
                }

                if (await _repository.ClinicalHistoryExistsAsync(doctor.Id, dateQueryUtc))
                {
                    response.Message = "El doctor ya tiene una cita registrada en la fecha y hora indicadas";
                    response.HttpCode = "409";
                    return response;
                }

                if (await _repository.PatientClinicalHistoryExistsAsync(patient.Id, dateQueryUtc))
                {
                    response.Message = "El paciente ya tiene una cita registrada en la fecha y hora indicadas";
                    response.HttpCode = "409";
                    return response;
                }

                patient.CreateClinicHistory(doctor.Id,
                                            dateQueryUtc,
                                            motiveText,
                                            request.Diagnostic,
                                            request.Observations,
                                            request.TotalCost,
                                            request.WasPaid,
                                            statusId: 2);

                _repository.Update(patient);
                var result = await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

                if (!result)
                {
                    response.Message = "No se pudo guardar la cita";
                    response.HttpCode = "500";
                    return response;
                }

                response.Code = "SUCCESS";
                response.HttpCode = "200";
                response.Data = Unit.Value;
                response.Message = "Cita creada y aceptada correctamente";

                string title = "Nueva Cita Confirmada";
                string message = $"El Dr. {doctor.LastName} agendó una cita para el {localDate:dd/MM/yyyy HH:mm}.";

                try
                {
                    var notification = Notification.CreateNotification(
                        targetUserId: patient.AuthUserId,
                        senderUserId: userId,
                        title: title,
                        message: message,
                        type: "APPOINTMENT_ACCEPTED",
                        actionUrl: patient.Id.ToString());

                    _repositoryNotification.Add(notification);
                    await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"⚠️ Error guardando notificación de cita creada por doctor: {ex.Message}");
                }

                if (patient.AuthUser?.Devices != null)
                {
                    foreach (var device in patient.AuthUser.Devices.Where(d => !string.IsNullOrWhiteSpace(d.DeviceToken)))
                    {
                        try
                        {
                            await _firebase.SendAsync(
                                device.DeviceToken,
                                title,
                                message,
                                new Dictionary<string, string>
                                {
                                    { "type", "APPOINTMENT_ACCEPTED" },
                                    { "patientId", patient.Id.ToString() }
                                });
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"⚠️ Error enviando Firebase al paciente: {ex.Message}");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                response.Message = "Error interno al crear la cita";
                response.Error = ex.Message;
                response.HttpCode = "500";
            }

            return response;
        }
    }
}
