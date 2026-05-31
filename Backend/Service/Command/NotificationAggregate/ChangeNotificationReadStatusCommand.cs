using MediatR;
using Service.Command.UtilsAggregate;

namespace Service.Command.NotificationAggregate
{
    public class ChangeNotificationReadStatusCommand : IRequest<ResponseGenericCommand<bool>>
    {
        public int NotificationId { get; set; }
        public bool IsRead { get; set; }
    }
}
