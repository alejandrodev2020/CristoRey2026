using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

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
        public string BusinessName { get; set; }
        public string Ubication { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Link { get; set; }
        public bool? IsEmergency { get; set; }
        public bool? IsActive { get; set; }
    }
}
