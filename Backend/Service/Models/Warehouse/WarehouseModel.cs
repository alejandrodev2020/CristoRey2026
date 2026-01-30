using Service.Models.Classifier;

namespace Service.Models.Warehouse
{
    public class WarehouseModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Code { get; set; }
        public string? Location { get; set; }
        public int? WarehouseTypeId { get; set; }
        public bool? IsActive { get; set; }
        public int? CountProduct { get; set; }
        public BaseClassifierModel? Type { get; set; }
    }
}
