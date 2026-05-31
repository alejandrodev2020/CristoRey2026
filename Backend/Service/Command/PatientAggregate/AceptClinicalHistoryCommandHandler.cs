using Domain.Entities.NotificationAggregate; // 👈 NUEVO: Tu entidad de notificación
using Domain.Entities.PatientAggregate;
using MediatR;
using Microsoft.AspNetCore.Http; // 👈 NUEVO: Para leer el token del doctor
using System.Security.Claims;

namespace Service.Command.PatientAggregate
{
    public class AceptClinicalHistoryCommandHandler : IRequestHandler<AceptClinicalHistoryCommand, Unit>
    {
        private readonly IPatientRepository _repository;
        private readonly INotificationRepository _repositoryNotification; // 👈 NUEVO
        private readonly IHttpContextAccessor _httpContextAccessor; // 👈 NUEVO

        public AceptClinicalHistoryCommandHandler(IPatientRepository repository,
                                                  INotificationRepository repositoryNotification, // 👈 NUEVO
                                                  IHttpContextAccessor httpContextAccessor) // 👈 NUEVO
        {
            _repository = repository;
            _repositoryNotification = repositoryNotification; // 👈 NUEVO
            _httpContextAccessor = httpContextAccessor; // 👈 NUEVO
        }

        public async Task<Unit> Handle(AceptClinicalHistoryCommand request, CancellationToken cancellationToken)
        {
            var statusAcept = 2;
            var record = await _repository.FindClinicalHistoryById(request.Id); // 'record' es el Paciente (Patient)

            var histoy = record.ClinicalHistorys.Where(ele => ele.Id.Equals(request.Id))
                                                .SingleOrDefault();

            histoy.setStatus(statusAcept);
            _repository.Update(record);

            bool result = await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            // ====================================================================
            // 👈 NUEVO: NOTIFICAR AL PACIENTE/CLIENTE (CITA ACEPTADA)
            // ====================================================================
            if (result)
            {
                try
                {
                    // 1. Extraemos el ID del doctor desde su sesión activa
                    var doctorUserIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                    if (int.TryParse(doctorUserIdClaim, out int doctorUserId))
                    {
                        string titulo = "Cita Confirmada";
                        string mensaje = $"¡Buenas noticias! Tu solicitud de cita para el {histoy.DateQuery:dd/MM/yyyy} ha sido confirmada por el doctor.";

                        // 2. Construimos el registro de la alerta para el paciente
                        var clientNotification = Notification.CreateNotification(
                            targetUserId: record.AuthUserId,    // Recibe el PACIENTE
                            senderUserId: doctorUserId,         // Envía el DOCTOR
                            title: titulo,
                            message: mensaje,
                            type: "APPOINTMENT_ACCEPTED",       // Tipo específico para éxito
                            actionUrl: histoy.Id.ToString()     // ID de referencia
                        );

                        _repositoryNotification.Add(clientNotification);

                        // Impactamos la alerta en la base de datos
                        await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);
                    }
                }
                catch (Exception ex)
                {
                    // Evitamos romper la respuesta si el registro del historial de alertas falla
                    Console.WriteLine($"⚠️ Error guardando notificación de aceptación en BD: {ex.Message}");
                }
            }
            // ====================================================================

            return Unit.Value;
        }
    }
}