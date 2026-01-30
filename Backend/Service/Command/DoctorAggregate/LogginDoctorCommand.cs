using MediatR;
using Service.Models.Doctor;

namespace Service.Command.DoctorAggregate
{
    public class LogginDoctorCommand : IRequest<DoctorModel>
    {
        public string Ci { get; set; }
        public string Phone { get; set; }
    }
}
