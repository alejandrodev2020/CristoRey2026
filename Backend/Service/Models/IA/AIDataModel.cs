using Service.Models.Client;
using Service.Models.Product;

namespace Service.Models.IA
{
    public class AIDataModel
    {
        public string Actions { get; set; }
        public int ActionTypeId { get; set; }
        public ClientModel Client { get; set; }
        public List<ProductResponseIAModel> Details { get; set; }
    }
}
