using Resources.Domain.Entities.Repository;

namespace Domain.Entities.NotificationAggregate
{
    public interface INotificationRepository : IRepository<Notification>
    {
        public Task<Notification?> FindByIdAsync(int id);
    }
}
