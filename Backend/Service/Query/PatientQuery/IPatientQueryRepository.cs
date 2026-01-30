using Service.Models.Patient;
using System.Collections.Generic;

namespace Service.Query.PatientQuery
{
    public interface IPatientQueryRepository
    {
        public IEnumerable<PatientModel> GetListPatient(int? doctorId);
        public PatientModel GetPatientById(int id);
        public byte[] GetPhoto(int id);
        public PatientModel GetCiValidate(string ci);
        public PatientModel GetAuthPatientByCiAndPhone(string ci, string phone);
        public IEnumerable<ClinicalHistoryModel> GetListClinicalHistoryByPatientId(int id, int? doctorId);
    }
}
