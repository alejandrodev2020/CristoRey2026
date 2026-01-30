using System.Text.Json.Serialization;

namespace Service.Models.Options
{
    public class TratamentModel
    {
        public int Id { get; set; }
        public int OptionId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        [JsonIgnore]
        public byte[] PictureByte { get; set; }
        public string Picture { get; set; }
        public bool? HasPicture { get; set; }
        public bool? IsActive { get; set; }
    }
}
