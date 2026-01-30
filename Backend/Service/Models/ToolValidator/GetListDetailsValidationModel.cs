using Service.Models.Warehouse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Models.ToolValidator
{
    public class GetListDetailsValidationModel
    {
        public bool Observation { get; set; }
        public IEnumerable<string> Messages { get; set; }
        public IEnumerable<WarehouseProductModel> ListProducts { get; set; }
    }
}
