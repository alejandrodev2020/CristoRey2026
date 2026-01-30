using Service.Models.Doctor;
using Service.Models.Patient;
using System.Collections.Generic;

namespace Service.Query.DoctorQuery
{
    public interface IDoctorQueryRepository
    {
        public IEnumerable<DoctorModel> GetListProvider();
        public DoctorModel GetProviderById(int id);
        public DoctorModel GetUserNameValidate(string ci);
        public DoctorModel GetAuthUserByCiAndPhone(string ci, string phone);
        public IEnumerable<ClinicalHistoryModel> GetListClinicalHistoryByDoctorId(int id);

    }
}
