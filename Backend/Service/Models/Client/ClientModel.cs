using Service.Models.Classifier;

namespace Service.Models.Client
{
    public class ClientModel
    {
            public int Id { get; set; }
            public string FirstName { get; set; }
            public string LastName {get; set; }
            public string Phone {get; set; }
            public string Nit {get; set; }
            public byte[] File {get; set; }
            public string Photo {get; set; }
            public int? ClientZoneId { get; set; }
            public string Ubication {get; set; }
            public string Company {get; set; }
            public bool? HasPhoto {get; set; }
            public int? ClientRateId { get; set; }
            public int? ClientTypeId { get; set; }
            public int? ClientDiscountId { get; set; }
            public bool? IsActive {get; set; }
            public BaseClassifierModel Zone { get; set; }
    }
}
