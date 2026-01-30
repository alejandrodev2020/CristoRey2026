using Data.Command.Contexts;
using Microsoft.EntityFrameworkCore;
using Resources.Domain.Entities;

namespace Data.Command.Repository
{
    public abstract class BaseRepository<TEntity> : Resources.Data.Command.Repository.BaseRepository<TEntity, DbContexts> where TEntity : BaseNotMappedModel, IAggregateRoot
    {
        protected BaseRepository(DbContexts context) : base(context)
        {
            
        }
        protected override DbSet<TEntity> DataSet { get => _context.Set<TEntity>(); }
    }
}
