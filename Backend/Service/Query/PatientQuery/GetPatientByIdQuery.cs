using MediatR;
using Service.Models.Patient;

namespace Service.Query.PatientQuery
{
    public class GetPatientByIdQuery : IRequest<PatientModel>
    {
        public int Id { get; set; }
    }
}
