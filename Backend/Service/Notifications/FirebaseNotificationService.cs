using FirebaseAdmin.Messaging;

namespace Service.Notifications
{
    public class FirebaseNotificationService
    {
        public async Task<string> SendAsync(
            string token,
            string title,
            string body,
            Dictionary<string, string>? data = null)
        {
            var message = new Message
            {
                Token = token,
                Notification = new Notification
                {
                    Title = title,
                    Body = body
                },
                Data = data
            };

            var result = await FirebaseMessaging.DefaultInstance.SendAsync(message);
            return result;
        }
    }
}
