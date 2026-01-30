using Resources.Domain.Entities.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Options
{
    public interface IOptionsRepository : IRepository<Options>
    {
        Task<Options> FindByIdAsync(int id);
        Task<Options> FindEquivalenceByIdAsync(int id);
        Task<Options> FindByIdAsyncAsnoTraking(int id);

    }
}
