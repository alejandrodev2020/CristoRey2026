using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Models.Product
{
    public class ProductRateModel
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int RateId { get; set; }
        public decimal? Margin { get; set; }
        public decimal? Price { get; set; }
        public decimal? Percentage { get; set; }
        public bool? IsActive { get; set; }
        public RateModel Rate { get; set; }
    }
}
