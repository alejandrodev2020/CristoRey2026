using Data.Command.Contexts;
using Domain.Entities.NotificationAggregate;
using Microsoft.EntityFrameworkCore;
using Resources.Domain.Entities.Repository;

namespace Data.Command.Repository
{

    public class NotificationRepository : BaseRepository<Notification>, INotificationRepository
    {
        public NotificationRepository(DbContexts context) : base(context)
        {
        }
        public IUnitOfWork UnitOfWork => _context;

        public Notification Add(Notification entity)
        {
            return AddAux(entity);
        }

        public void Delete(Notification entity)
        {
            DeleteAux(entity);
        }

        public async Task<Notification?> FindByIdAsync(int id)
        {
            return await _context.Notification
                .Where(ele => ele.Id.Equals(id))
                .SingleOrDefaultAsync();
        }
        public Notification Update(Notification entity)
        {
            return UpdateAux(entity);
        }
    }
}
