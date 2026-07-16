using Resources.Domain.Entities.Repository;

namespace Domain.Entities.PatientAggregate
{
    public interface IPatientRepository : IRepository<Patient>
    {
        Task<Patient?> FindByIdAsync(int id);
        Task<Patient?> FindByAuthUserIdAsync(int id);
        Task<Patient?> FindPatientWithDevicesAsync(int id);
        Task<Patient> FindClinicalHistoryById(int id);
        Task<bool> ClinicalHistoryExistsAsync(int doctorId, DateTime dateQuery, int? patientId = null);
        Task<bool> PatientClinicalHistoryExistsAsync(int patientId, DateTime dateQuery);
    }
}
