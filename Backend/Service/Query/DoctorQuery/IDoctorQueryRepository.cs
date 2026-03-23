using Service.Models.Doctor;
using Service.Models.Patient;

namespace Service.Query.DoctorQuery
{
    public interface IDoctorQueryRepository
    {
        public IEnumerable<DoctorModel> GetListDoctor(bool? isEmergency);
        public DoctorModel GetProviderById(int id);
        public DoctorModel GetDoctorByAuthUserId(int id);
        public IEnumerable<ClinicalHistoryModel> GetListClinicalHistoryByDoctorId(int id);
        public IEnumerable<DoctorAppointmentHourModel> GetAppointmentHourByDoctorId(int id, DateTime date);

    }
}
