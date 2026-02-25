namespace Service.Models.BaseModel
{
    public abstract class BaseDynamicModel
    {
        public Dictionary<string, object?> CustomFields { get; set; } = new();
    }
}
