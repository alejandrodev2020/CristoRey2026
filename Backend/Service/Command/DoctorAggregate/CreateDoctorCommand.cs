using MediatR;
using Service.Models.Doctor;

namespace Service.Command.DoctorAggregate
{
    public class CreateDoctorCommand: IRequest<DoctorModel>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Ci { get; set; }
        public string? Nit { get; set; }
        public string? Photo { get; set; }
        public string? Ubication { get; set; }
        public string? Latitude { get; set; }
        public string? Longitude { get; set; }
        public string? businessName { get; set; }
        public bool? IsEmergency { get;  set; }
    }
}
