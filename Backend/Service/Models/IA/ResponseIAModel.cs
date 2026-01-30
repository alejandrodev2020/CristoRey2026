namespace Service.Models.IA
{
    public class ResponseIAModel
    {
        public int Status { get; set; } = 200;
        public int Type { get; set; } = 1;
        public List<string> Messages { get; set; } = new();
        public string ThreadId { get; set; } = string.Empty;
        public AIDataModel Data { get; set; }
    }
}
