using Data.Command.Contexts;
using Domain.Entities.Options;
using Microsoft.EntityFrameworkCore;
using Resources.Domain.Entities.Repository;

namespace Data.Command.Repository
{
    public class OptionsRepository : BaseRepository<Options>, IOptionsRepository
    {
        public OptionsRepository(DbContexts context) : base(context)
        {
        }
        public IUnitOfWork UnitOfWork => _context;

        public Options Add(Options entity)
        {
            return AddAux(entity);
        }

        public void Delete(Options entity)
        {
            DeleteAux(entity);
        }

        public async Task<Options> FindByIdAsync(int id)
        {
            return await _context.Options.Where(ele => ele.Id.Equals(id))
                                         .Include(p => p.Diasnostics)
                                         .SingleOrDefaultAsync();
        }

        public async Task<Options> FindEquivalenceByIdAsync(int id)
        {
            return await _context.Options.Include(p => p.Diasnostics)
                                         .Where(ele => ele.Id.Equals(id))
                                         .SingleOrDefaultAsync();
        }

        public async Task<Options> FindByIdAsyncAsnoTraking(int id)
        {
            return await _context.Options.Include(p => p.Diasnostics)
                                         .Where(ele => ele.Id.Equals(id))
                                         .AsNoTracking()
                                         .SingleOrDefaultAsync();
        }


        public Options Update(Options entity)
        {
            return UpdateAux(entity);
        }

    
    }
}
