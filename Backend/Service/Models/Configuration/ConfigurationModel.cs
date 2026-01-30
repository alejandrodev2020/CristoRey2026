using Service.Models.Classifier;

namespace Service.Models.Configuration
{
    public class ConfigurationModel
    {
        public  int Id { get;  set; }
        public string Code { get; set; }
        public int PlanId { get; set; }
        public int? PettyCashId { get; set; }
        public int? WarehouseId { get; set; }
        public bool? PaymentTypeCash { get; set; }
        public bool? PaymentTypeQr { get; set; }
        public bool? PaymentTypeCard { get; set; }
        public bool? IsActive { get; set; }
        public BaseClassifierModel Plan { get; set; }
    }
}
