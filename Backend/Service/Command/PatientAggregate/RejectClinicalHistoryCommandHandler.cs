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
                    Console.WriteLine("🚀 INICIO envío Firebase Push rechazo cita");

                    if (record.AuthUser == null)
                    {
                        Console.WriteLine("⚠️ No se envía Firebase porque record.AuthUser es NULL");
                    }
                    else if (record.AuthUser.Devices == null)
                    {
                        Console.WriteLine("⚠️ No se envía Firebase porque record.AuthUser.Devices es NULL");
                    }
                    else if (!record.AuthUser.Devices.Any())
                    {
                        Console.WriteLine("⚠️ No se envía Firebase porque el paciente no tiene devices");
                    }
                    else
                    {
                        Console.WriteLine($"📱 Devices encontrados: {record.AuthUser.Devices.Count}");

                        var devicesWithToken = record.AuthUser.Devices
                            .Where(x => !string.IsNullOrWhiteSpace(x.DeviceToken))
                            .ToList();

                        Console.WriteLine($"📱 Devices con token válido: {devicesWithToken.Count}");

                        foreach (var device in devicesWithToken)
                        {
                            try
                            {
                                Console.WriteLine("📡 Enviando notificación Firebase rechazo...");
                                Console.WriteLine($"📱 Device.Id: {device.Id}");
                                Console.WriteLine($"📱 Token destino: {device.DeviceToken}");

                                var messageId = await _firebase.SendAsync(
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

                                Console.WriteLine($"✅ Firebase enviado correctamente. MessageId: {messageId}");
                            }
                            catch (FirebaseAdmin.Messaging.FirebaseMessagingException fbEx)
                            {
                                Console.WriteLine($"❌ ERROR Firebase enviando al Device.Id: {device.Id}");
                                Console.WriteLine($"❌ Token problemático: {device.DeviceToken}");
                                Console.WriteLine($"❌ Firebase ErrorCode: {fbEx.ErrorCode}");
                                Console.WriteLine($"❌ Firebase Message: {fbEx.Message}");
                                Console.WriteLine(fbEx.ToString());
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine($"❌ ERROR general enviando al Device.Id: {device.Id}");
                                Console.WriteLine($"❌ Token problemático: {device.DeviceToken}");
                                Console.WriteLine($"❌ Message: {ex.Message}");
                                Console.WriteLine($"❌ StackTrace: {ex.StackTrace}");
                                Console.WriteLine(ex.ToString());
                            }
                        }

                        Console.WriteLine("🏁 FIN envío Firebase Push rechazo cita");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("❌ ERROR inesperado preparando envío Firebase rechazo");
                    Console.WriteLine($"❌ Message: {ex.Message}");
                    Console.WriteLine($"❌ StackTrace: {ex.StackTrace}");
                    Console.WriteLine(ex.ToString());
                }
            }

            return Unit.Value;
        }
    }
}