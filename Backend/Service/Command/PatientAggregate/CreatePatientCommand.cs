using MediatR;
using Service.Models.Patient;

namespace Service.Command.PatientAggregate
{
    public class CreatePatientCommand : IRequest<PatientModel>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Ci { get; set; }
        public string Nit { get; set; }
        public string? Photo { get; set; }
        public string? Ubication { get; set; }
        public int? DepartamentId { get; set; }
        public int? CityId { get; set; }
        public int? GenderId { get; set; }
        public int? DoctorId { get; set; }
    }
}
