using Resources.Domain.Entities.Repository;

namespace Domain.Entities.PatientAggregate
{
    public interface IPatientRepository : IRepository<Patient>
    {
        Task<Patient> FindByIdAsync(int id);
        Task<Patient> FindClinicalHistoryById(int id);
    }
}
