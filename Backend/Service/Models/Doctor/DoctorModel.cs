using Service.Models.Classifier;
using System.Text.Json.Serialization;

namespace Service.Models.Doctor
{
    public class DoctorModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Ci { get; set; }
        public string Nit { get; set; }
        [JsonIgnore]
        public byte[] PhotoByte { get; set; }
        public string Photo { get; set; }
        public string Specialty { get; set; }
        public string Ubication { get; set; }
        public int ZoneId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Link { get; set; }
        public bool? IsEmergency { get; set; }
        public bool? IsActive { get; set; }
        public BaseClassifierModel Zone { get; set; }
    }
}
