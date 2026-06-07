using Domain.Entities.NotificationAggregate;
using Domain.Entities.PatientAggregate;
using MediatR;
using Microsoft.AspNetCore.Http;
using Service.Notifications;
using System.Security.Claims;

namespace Service.Command.PatientAggregate
{
    public class RejectClinicalHistoryCommandHandler : IRequestHandler<RejectClinicalHistoryCommand, Unit>
    {
        private readonly IPatientRepository _repository;
        private readonly INotificationRepository _repositoryNotification;
        private readonly FirebaseNotificationService _firebase;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public RejectClinicalHistoryCommandHandler(
            IPatientRepository repository,
            INotificationRepository repositoryNotification,
            FirebaseNotificationService firebase,
            IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _repositoryNotification = repositoryNotification;
            _firebase = firebase;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Unit> Handle(RejectClinicalHistoryCommand request, CancellationToken cancellationToken)
        {
            var statusAcept = 3;

            var record = await _repository.FindClinicalHistoryById(request.Id);

            var histoy = record.ClinicalHistorys
                .Where(ele => ele.Id.Equals(request.Id))
                .SingleOrDefault();

            histoy.setStatus(statusAcept);

            _repository.Update(record);

            bool result = await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            if (result)
            {
                string titulo = "Cita Rechazada";
                string mensaje = $"Lo sentimos, tu solicitud de cita para el {histoy.DateQuery:dd/MM/yyyy} ha sido rechazada.";

                try
                {
                    var doctorUserIdClaim = _httpContextAccessor.HttpContext?.User
                        .FindFirst(ClaimTypes.NameIdentifier)?.Value;

                    if (int.TryParse(doctorUserIdClaim, out int doctorUserId))
                    {
                        var clientNotification = Notification.CreateNotification(
                            targetUserId: record.AuthUserId,
                            senderUserId: doctorUserId,
                            title: titulo,
                            message: mensaje,
                            type: "APPOINTMENT_REJECTED",
                            actionUrl: histoy.Id.ToString()
                        );

                        _repositoryNotification.Add(clientNotification);

                        await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"⚠️ Error guardando notificación de rechazo en BD: {ex.Message}");
                }

                try
                {
                    if (record.AuthUser?.Devices != null && record.AuthUser.Devices.Any())
                    {
                        foreach (var device in record.AuthUser.Devices.Where(x => !string.IsNullOrEmpty(x.DeviceToken)))
                        {
                            await _firebase.SendAsync(
                                device.DeviceToken,
                                titulo,
                                mensaje,
                                new Dictionary<string, string>
                                {
                                    { "type", "APPOINTMENT_REJECTED" },
                                    { "clinicalHistoryId", histoy.Id.ToString() },
                                    { "patientId", record.Id.ToString() }
                                }
                            );
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"⚠️ Error enviando notificación push de rechazo: {ex.Message}");
                }
            }

            return Unit.Value;
        }
    }
}