using Resources.Domain.Entities.Repository;

namespace Domain.Entities.DoctorAggregate
{
    public interface IDoctorRepository : IRepository<Doctor>
    {
        public Task<Doctor> FindByIdAsync(int id);
    }
}
