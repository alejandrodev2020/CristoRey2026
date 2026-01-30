using Data.Command.Contexts;
using Domain.Entities.AuthAggregate;
using Microsoft.EntityFrameworkCore;
using Resources.Domain.Entities.Repository;

namespace Data.Command.Repository
{

    public class AuthUserRepository : BaseRepository<AuthUser>, IAuthUserRepository
    {
        public AuthUserRepository(DbContexts context) : base(context)
        {
        }
        public IUnitOfWork UnitOfWork => _context;

        public AuthUser Add(AuthUser entity)
        {
            return AddAux(entity);
        }

        public void Delete(AuthUser entity)
        {
            DeleteAux(entity);
        }

        public async Task<AuthUser> FindByIdAsync(int id)
        {
            return await _context.AuthUser.Where(ele => ele.Id.Equals(id))
                                          .Include(e => e.AuthUserConfiguration)
                                          .SingleOrDefaultAsync();
        }

        public AuthUser Update(AuthUser entity)
        {
            return UpdateAux(entity);
        }
    }
}
