using Service.Models.Warehouse;

namespace Service.Models.Patient
{
    public class GetListClinicalHistoryByPatientIdModel
    {
        public int Limit { get; set; }
        public int Page { get; set; }
        public int Total { get; set; }
        public IEnumerable<ClinicalHistoryModel?> ClinicalHistorys { get; set; }
    }
}
