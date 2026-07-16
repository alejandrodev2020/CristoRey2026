using Service.Models.Doctor;
using Service.Models.Patient;

namespace Service.Query.DoctorQuery
{
    public interface IDoctorQueryRepository
    {
        public GetListDoctorModel GetListDoctor(bool? isEmergency,
                                                      bool? onlyActive,
                                                      bool? requiresPhoto,
                                                      int limit,
                                                      int page);
        public DoctorModel GetProviderById(int id);
        public DoctorModel GetDoctorByAuthUserId(int id);
        public IEnumerable<ClinicalHistoryModel> GetListClinicalHistoryByDoctorId(int id, DateTime? dateQuery, DateTime? dateInit, DateTime? dateEnd);
        public GetListClinicalHistoryByPatientIdModel GetListClinicalHistoryByDoctorIdPaged(int id, DateTime? dateQuery, DateTime? dateInit, DateTime? dateEnd, int limit, int page);
        public IEnumerable<DoctorAppointmentHourModel> GetAppointmentHourByDoctorId(int id, DateTime date);

    }
}
