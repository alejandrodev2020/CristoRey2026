using MediatR;
using Service.Notifications;

namespace Service.Command.NotificationAggregate
{
    public class SendTestNotificationCommandHandler : IRequestHandler<SendTestNotificationCommand, Unit>
    {
        private readonly FirebaseNotificationService _firebase;
        public SendTestNotificationCommandHandler(FirebaseNotificationService firebase)
        {
            _firebase = firebase;   
        }

        public async Task<Unit> Handle(SendTestNotificationCommand request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.Token))
            {
                throw new Exception("El token FCM es requerido");
            }

            await _firebase.SendAsync(
                request.Token,
                "🚀 Prueba Firebase",
                "Notificación enviada correctamente desde MediatR",
                new Dictionary<string, string>
                {
            { "module", "notification" },
            { "env", "local" }
                }
            );

            return Unit.Value;
        }
    }
}
