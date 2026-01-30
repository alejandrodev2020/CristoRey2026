using Service.Models.Classifier;
using System.Text.Json.Serialization;

namespace Service.Models.Product
{
    public class ProductModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string DescriptionSmall { get; set; }  // Añadido DescriptionSmall
        public string Code { get; set; }
        public string Barcode { get; set; }           // Añadido Barcode
        public string OriginalCode { get; set; }      // Añadido OriginalCode
        public int? SupplierProviderId { get; set; }   // Añadido SupplierProviderId
        public decimal? DiscountOne { get; set; }      // Añadido DiscountOne
        public decimal? DiscountTwo { get; set; }      // Añadido DiscountTwo
        public decimal? DiscountThree { get; set; }    // Añadido DiscountThree
        public DateTime? CreationDate { get; set; }    // Añadido CreationDate
        public int? MaxApplicableDiscount { get; set; } // Añadido MaxApplicableDiscount
        public string Location { get; set; }
        public int? Weight { get; set; }
        public decimal? Thread { get; set; }
        public int? MinimumPackaging { get; set; }
        public string Manufacturer { get; set; }
        public bool RequiredExpired { get; set; }
        public decimal SuggestedPriceShopping { get; set; }
        public decimal SuggestedPriceSale { get; set; }
        public decimal? SuggestedPriceSaleOne { get; set; }
        public decimal? SuggestedPriceSaleTwo { get; set; }
        public decimal? SuggestedPriceSaleThree { get; set; }
        public decimal? SuggestedPriceSaleFour { get; set; }
        public int UnitMeasurementId { get; set; }
        public int? ProductCategoryId { get; set; }
        [JsonIgnore]
        public byte[] PictureByte { get; set; }
        public string Picture { get; set; }
        public bool? HasEquivalences { get; set; }       // Añadido HasEquivalences
        public bool? IsBundle { get; set; }             // Añadido IsBundle
        public bool? OnlyUnitMeasurement { get; set; }  // Añadido OnlyUnitMeasurement
        public BaseClassifierModel Category { get; set; }
        //public UnitMeasurementModel UnitMeasurement { get; set; }
        public IEnumerable<ProductRateModel> ListProductRate { get; set; }
    }
}
