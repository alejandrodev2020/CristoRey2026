using Service.Models.Classifier;
using Service.Models.Product;
using System.Text.Json.Serialization;

namespace Service.Models.Warehouse
{
    public class WarehouseProductModel
    {
        public int Id { get; set; }
        public int WarehouseId { get; set; }
        [JsonIgnore]
        public int ProductId { get; set; }
        public decimal? Amount { get; set; }
        public decimal? AmountRequest { get; set; }
        public decimal? PurcharsePrice { get; set; }
        public decimal? SuggestedPrice { get; set; }
        public bool? Existing { get; set; }
        public bool? IsActive { get; set; }
        public WarehouseModel Warehouse { get; set; }
        public ProductModel Product { get; set; }
        public BaseClassifierModel UnitMeasurement { get; set; }
    }
}
