using MediatR;
using Service.Models.Patient;

namespace Service.Command.PatientAggregate
{
    public class LogginPatientCommand : IRequest<PatientModel>
    {
        public string Ci { get; set; }
        public string Phone { get; set; }
    }
}
