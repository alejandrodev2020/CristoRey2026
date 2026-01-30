using System.Text.Json.Serialization;

namespace Service.Models.IA
{
    public class IAModel
    {
        public class AIDataParsed
        {
            [JsonPropertyName("actions")]
            public string Actions { get; set; }

            [JsonPropertyName("actionTypeId")]
            public int ActionTypeId { get; set; }

            [JsonPropertyName("client")]
            public AIClientParsed Client { get; set; }

            [JsonPropertyName("details")]
            public List<AIProductParsed> Details { get; set; }
        }

        public class AIClientParsed
        {
            [JsonPropertyName("id")]
            public int Id { get; set; }

            [JsonPropertyName("name")]
            public string Name { get; set; }

            [JsonPropertyName("sCompany")]
            public string Company { get; set; }

            [JsonPropertyName("nClientDiscountId")]
            public decimal? Discount { get; set; }

            [JsonPropertyName("nClientRateId")]
            public int? NClientRateId { get; set; } // 👈 NUEVO

            [JsonPropertyName("sFirstName")]
            public string SFirstName { get; set; }

            [JsonPropertyName("sLastName")]
            public string SLastName { get; set; }

            [JsonPropertyName("sPhone")]
            public string Phone { get; set; }

            [JsonPropertyName("sNit")]
            public string Nit { get; set; }
        }

        public class AIProductParsed
        {
            [JsonPropertyName("nProductId")]
            public int NProductId { get; set; }

            [JsonPropertyName("sName")]
            public string SName { get; set; }

            [JsonPropertyName("sDescription")]
            public string SDescription { get; set; }

            [JsonPropertyName("sCode")]
            public string SCode { get; set; }

            [JsonPropertyName("discount")]
            public decimal? Discount { get; set; }
        }
    }
}
