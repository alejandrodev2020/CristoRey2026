using MediatR;
using Service.Notifications;
using FirebaseAdmin.Messaging;

namespace Service.Command.NotificationAggregate
{
    public class SendTestNotificationCommandHandler
        : IRequestHandler<SendTestNotificationCommand, Unit>
    {
        private readonly FirebaseNotificationService _firebase;

        public SendTestNotificationCommandHandler(FirebaseNotificationService firebase)
        {
            _firebase = firebase;
        }

        public async Task<Unit> Handle(
            SendTestNotificationCommand request,
            CancellationToken cancellationToken)
        {
            try
            {
                Console.WriteLine("🚀 INICIO ENVÍO FCM");

                if (string.IsNullOrWhiteSpace(request.Token))
                {
                    throw new Exception("El token FCM es requerido");
                }

                Console.WriteLine($"📲 TOKEN RECIBIDO: {request.Token}");
                Console.WriteLine("📡 Enviando mensaje a Firebase...");

                var messageId = await _firebase.SendAsync(
                    request.Token,
                    "🚀 Prueba Firebase",
                    "Notificación enviada correctamente desde MediatR",
                    new Dictionary<string, string>
                    {
                        { "module", "notification" },
                        { "env", "production" }
                    }
                );

                Console.WriteLine($"✅ MENSAJE ENVIADO. ID: {messageId}");

                return Unit.Value;
            }
            catch (FirebaseMessagingException fbEx)
            {
                Console.WriteLine("🔥 ERROR FIREBASE MESSAGING");
                Console.WriteLine($"🔥 Code: {fbEx.ErrorCode}");
                Console.WriteLine($"🔥 Message: {fbEx.Message}");
                Console.WriteLine(fbEx.ToString());

                // Re-lanzamos para que Swagger muestre 500
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine("❌ ERROR GENERAL EN ENVÍO FCM");
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.ToString());

                throw;
            }
        }
    }
}
