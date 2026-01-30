using MediatR;
using Service.Models.Patient;

namespace Service.Query.PatientQuery
{
    public class GetListPatientQuery : IRequest<IEnumerable<PatientModel>>
    {
        public int? DoctorId { get; set; }
    }
}
