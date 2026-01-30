using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Models.Product
{
    public class ProductResponseIAModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int UnitMeasurementId { get; set; }
        public decimal? AmountRequested { get; set; } 
        public decimal? Stock { get; set; }    
        public decimal? PurcharsePrice { get; set; }  
        public decimal? SuggestedPrice { get; set; }
        public IEnumerable<ProductRateModel> ListProductRate { get; set; }
    }
}
