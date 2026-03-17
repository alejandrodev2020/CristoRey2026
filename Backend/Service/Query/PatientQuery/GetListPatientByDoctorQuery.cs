using MediatR;
using Service.Models.Patient;
using Service.Query.BasesQuery;

namespace Service.Query.PatientQuery
{
    public class GetListPatientByDoctorQuery : BaseFilterQuery, IRequest<IEnumerable<PatientModel>>
    {
        public string? Search { get; set; }
        public bool? ReturnImage { get; set; }
    }
}
