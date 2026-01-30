using Service.Models.Classifier;

namespace Service.Models.Patient
{
    public class PatientModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Ci { get; set; }
        public string Nit { get; set; }
        public byte[] File { get; set; }
        public string Photo { get; set; }
        public int? PatientZoneId { get; set; } 
        public string Ubication { get; set; }
        public string Company { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public string Reference { get; set; }
        public string Link { get; set; }
        public bool? HasPhoto { get; set; }
        public bool? IsVerified { get; set; }
        public string CodeVerified { get; set; }
        public bool? IsActive { get; set; } 
        public int? Usercode { get; set; } 
        public int? DepartamentId { get; set; } 
        public int? CityId { get; set; } 
        public int? GenderId { get; set; } 
        public int? DoctorId { get; set; } 
        public string Token { get; set; }
        public BaseClassifierModel Zone { get; set; }
    }
}
