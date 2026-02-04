using MediatR;

namespace Service.Command.NotificationAggregate
{
    public class SendTestNotificationCommand : IRequest
    {
        public string Token { get; set; }
    }
}
