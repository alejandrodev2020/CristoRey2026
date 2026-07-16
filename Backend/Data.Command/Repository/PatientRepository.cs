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

        public async Task<Patient?> FindByAuthUserIdAsync(int id)
        {
            return await _context.Patient
                .Where(p => p.AuthUserId == id)
                .SingleOrDefaultAsync();
        }

        public async Task<Patient?> FindByIdAsync(int id)
        {
            return await _context.Patient
                .Include(ele => ele.AuthUser)
                .Where(ele => ele.Id.Equals(id))
                .SingleOrDefaultAsync();
        }

        public async Task<Patient?> FindPatientWithDevicesAsync(int id)
        {
            return await _context.Patient
                .Include(p => p.AuthUser)
                    .ThenInclude(a => a.Devices)
                .Where(p => p.Id == id)
                .SingleOrDefaultAsync();
        }

        public async Task<bool> ClinicalHistoryExistsAsync(int doctorId, DateTime dateQuery, int? patientId = null)
        {
            return await _context.ClinicalHistory.AnyAsync(ch =>
                ch.DoctorId == doctorId &&
                ch.DateQuery == dateQuery &&
                ch.StatusId != 3 &&
                (!patientId.HasValue || ch.PatientId == patientId.Value));
        }

        public async Task<bool> PatientClinicalHistoryExistsAsync(int patientId, DateTime dateQuery)
        {
            return await _context.ClinicalHistory.AnyAsync(ch =>
                ch.PatientId == patientId &&
                ch.DateQuery == dateQuery &&
                ch.StatusId != 3);
        }

        public async Task<Patient?> FindClinicalHistoryById(int id)
        {
            return await _context.Patient
                .Include(p => p.ClinicalHistorys)
                .Include(p => p.AuthUser)
                    .ThenInclude(a => a.Devices)
                .Where(p => p.ClinicalHistorys.Any(ch => ch.Id == id))
                .SingleOrDefaultAsync();
        }

        public Patient Update(Patient entity)
        {
            return UpdateAux(entity);
        }
    }
}
