using Data.Command.Contexts;
using Domain.Entities.DoctorAggregate;
using Microsoft.EntityFrameworkCore;
using Resources.Domain.Entities.Repository;

namespace Data.Command.Repository
{

    public class DoctorRepository : BaseRepository<Doctor>, IDoctorRepository
    {
        public DoctorRepository(DbContexts context) : base(context)
        {
        }
        public IUnitOfWork UnitOfWork => _context;

        public Doctor Add(Doctor entity)
        {
            return AddAux(entity);
        }

        public void Delete(Doctor entity)
        {
            DeleteAux(entity);
        }

        public async Task<Doctor> FindByIdAsync(int id)
        {
            return await _context.Doctor.Where(ele => ele.Id.Equals(id)).SingleOrDefaultAsync();
        }

        public Doctor Update(Doctor entity)
        {
            return UpdateAux(entity);
        }
    }
}
