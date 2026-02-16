using Domain.Entities.DoctorAggregate;
using Domain.Entities.Options;
using Domain.Entities.PatientAggregate;
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
        private readonly FirebaseNotificationService _firebase;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CreateClinicalHistoryCommandHandler(IPatientRepository repository,
                                                   FirebaseNotificationService firebase,
                                                   IDoctorRepository  repositoryDoctor,
                                                   IOptionsRepository repositoryOptions,
                                                   IHttpContextAccessor httpContextAccessor)
        {
            _firebase = firebase;
            _repository = repository;
            _repositoryDoctor = repositoryDoctor;   
            _repositoryOptions = repositoryOptions;
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

                DateTime myDate = DateTime.Now;
                if (request.DateQuery != null)
                {
                    myDate = request.DateQuery.Value;
                }
                record.CreateClinicHistory(request.DoctorId, myDate,
                    motiveText,
                    request.Diagnostic,
                    request.Observations, request.TotalCost, request.WasPaid);

                _repository.Update(record);
                bool result = await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);
                if (result)
                {
                    try
                    {
                        var doctor = await _repositoryDoctor.FindDoctorWithDevicesAsync(request.DoctorId);

                        if (doctor?.AuthUser?.Devices != null && doctor.AuthUser.Devices.Any())
                        {
                            string titulo = "Nueva Cita Agendada";
                            string mensaje = $"Hola Dr. {doctor.LastName}, tiene una nueva cita de {motiveText} para el {myDate:dd/MM/yyyy HH:mm}.";
                            foreach (var device in doctor.AuthUser.Devices.Where(x => !string.IsNullOrEmpty(x.DeviceToken)))
                            {
                                await _firebase.SendAsync(
                                    device.DeviceToken,
                                    titulo,
                                    mensaje,
                                    new Dictionary<string, string> {{ "type", "NEW_APPOINTMENT" },    { "patientId", record.Id.ToString() }}
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
