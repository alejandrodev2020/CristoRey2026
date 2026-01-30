using Data.Command.Contexts;
using Domain.Entities.PatientAggregate;
using Microsoft.EntityFrameworkCore;
using Resources.Domain.Entities.Repository;

namespace Data.Command.Repository
{

    public class PatientRepository : BaseRepository<Patient>, IPatientRepository
    {
        public PatientRepository(DbContexts context) : base(context)
        {
        }
        public IUnitOfWork UnitOfWork => _context;

        public Patient Add(Patient entity)
        {
            return AddAux(entity);
        }

        public void Delete(Patient entity)
        {
            DeleteAux(entity);
        }

        public async Task<Patient> FindByIdAsync(int id)
        {
            return await _context.Patient.Where(ele => ele.Id.Equals(id)).SingleOrDefaultAsync();
        }

        public async Task<Patient> FindClinicalHistoryById(int id)
        {
            return await _context.Patient
             .Include(p => p.ClinicalHistorys)
             .Where(p => p.ClinicalHistorys.Any(ch => ch.Id == id))
             .SingleOrDefaultAsync();
        }

        public Patient Update(Patient entity)
        {
            return UpdateAux(entity);
        }
    }
}
