using Service.Models.Doctor;
using Service.Models.Patient;

namespace Service.Query.PatientQuery
{
    public interface IPatientQueryRepository
    {
        public IEnumerable<PatientModel> GetListPatient(int? doctorId);
        public IEnumerable<PatientModel> GetListPatientByDoctorId(int doctorId, string search);
        public PatientModel GetPatientById(int id);
        public byte[] GetPhoto(int id);
        public PatientModel GetCiValidate(string ci);
        public GetListClinicalHistoryByPatientIdModel GetListClinicalHistoryByPatientId(int id, int? doctorId, int limit, int page);
        public PatientModel GetPatientByAuthUserId(int id);
        public DoctorModel GetDoctorByAuthUserId(int id);
        public ClinicalHistoryModel GetClinicalHistoryById(int id);
    }
}
