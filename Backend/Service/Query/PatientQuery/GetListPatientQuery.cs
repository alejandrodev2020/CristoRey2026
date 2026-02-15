using MediatR;
using Service.Models.Patient;
using Service.Query.BasesQuery;

namespace Service.Query.PatientQuery
{
    public class GetListPatientQuery : BaseFilterQuery, IRequest<IEnumerable<PatientModel>>
    {
        public int? DoctorId { get; set; }
        public bool? ReturnImage { get; set; }
    }
}
