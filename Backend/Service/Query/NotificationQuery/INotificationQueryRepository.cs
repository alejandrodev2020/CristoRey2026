using Service.Models.Notification;

namespace Service.Query.NotificationQuery
{
    public interface INotificationQueryRepository
    {
        IEnumerable<NotificationModel> GetMyNotificationsByTargetUserId(int targetUserId, bool onlyUnread);
        NotificationModel GetNotificationById(int notificationId);
        int GetUnreadNotificationsCount(int targetUserId);
    }
}
