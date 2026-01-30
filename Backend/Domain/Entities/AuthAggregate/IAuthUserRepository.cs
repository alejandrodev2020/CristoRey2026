using Resources.Domain.Entities.Repository;
using System.Threading.Tasks;

namespace Domain.Entities.AuthAggregate
{
    public interface  IAuthUserRepository: IRepository<AuthUser>
    {
        public Task<AuthUser> FindByIdAsync(int id);
    }
}
