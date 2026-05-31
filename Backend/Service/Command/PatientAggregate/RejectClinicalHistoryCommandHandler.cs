using Domain.Entities.NotificationAggregate; // 👈 NUEVO: Tu entidad de notificación
using Domain.Entities.PatientAggregate;
using MediatR;
using Microsoft.AspNetCore.Http; // 👈 NUEVO: Para leer el token del doctor
using System.Security.Claims;

namespace Service.Command.PatientAggregate
{
    public class RejectClinicalHistoryCommandHandler : IRequestHandler<RejectClinicalHistoryCommand, Unit>
    {
        private readonly IPatientRepository _repository;
        private readonly INotificationRepository _repositoryNotification; // 👈 NUEVO
        private readonly IHttpContextAccessor _httpContextAccessor; // 👈 NUEVO

        public RejectClinicalHistoryCommandHandler(IPatientRepository repository,
                                                   INotificationRepository repositoryNotification, // 👈 NUEVO
                                                   IHttpContextAccessor httpContextAccessor) // 👈 NUEVO
        {
            _repository = repository;
            _repositoryNotification = repositoryNotification; // 👈 NUEVO
            _httpContextAccessor = httpContextAccessor; // 👈 NUEVO
        }

        public async Task<Unit> Handle(RejectClinicalHistoryCommand request, CancellationToken cancellationToken)
        {
            var statusAcept = 3;
            var record = await _repository.FindClinicalHistoryById(request.Id); // 'record' es el Paciente (Patient)

            var histoy = record.ClinicalHistorys.Where(ele => ele.Id.Equals(request.Id))
                                                .SingleOrDefault();

            histoy.setStatus(statusAcept);
            _repository.Update(record);

            bool result = await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            // ====================================================================
            // 👈 NUEVO: NOTIFICAR AL PACIENTE/CLIENTE
            // ====================================================================
            if (result)
            {
                try
                {
                    // 1. Obtenemos el ID del doctor desde el token (el usuario logueado que rechaza)
                    var doctorUserIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                    if (int.TryParse(doctorUserIdClaim, out int doctorUserId))
                    {
                        string titulo = "Cita Cancelada / Rechazada";
                        string mensaje = $"Lo sentimos, tu solicitud de cita para el {histoy.DateQuery:dd/MM/yyyy} ha sido rechazada.";

                        // 2. Creamos la notificación invirtiendo los roles
                        var clientNotification = Notification.CreateNotification(
                            targetUserId: record.AuthUserId,    // El PACIENTE recibe (Target)
                            senderUserId: doctorUserId,         // El DOCTOR envía (Sender)
                            title: titulo,
                            message: mensaje,
                            type: "APPOINTMENT_REJECTED",
                            actionUrl: histoy.Id.ToString()     // ID de la historia clínica como referencia
                        );

                        _repositoryNotification.Add(clientNotification);

                        // Guardamos la notificación
                        await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);
                    }
                }
                catch (Exception ex)
                {
                    // Log local para evitar que el fallo del guardado de la alerta afecte la transacción principal
                    Console.WriteLine($"⚠️ Error guardando notificación de rechazo en BD: {ex.Message}");
                }
            }
            // ====================================================================

            return Unit.Value;
        }
    }
}