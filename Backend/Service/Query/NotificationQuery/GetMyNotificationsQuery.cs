using MediatR;
using Service.Models.BaseModel;
using Service.Models.Notification;

namespace Service.Query.NotificationQuery
{
    public class GetMyNotificationsQuery : IRequest<ResponseGenericModel<IEnumerable<NotificationModel>>>
    {
        public bool OnlyUnread { get; set; } = false;
    }
}