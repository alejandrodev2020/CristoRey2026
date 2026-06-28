using MediatR;
using Service.Models.Doctor;
using Service.Query.BasesQuery;

namespace Service.Query.DoctorQuery
{
    public class GetListDoctorQuery : BaseFilterQuery, IRequest<IEnumerable<DoctorModel>>
    {
        public bool? IsEmergency { get; set; } = null;
        public bool? OnlyActive { get; set; } = null;
        public bool? RequiresPhoto { get; set; } = null;
    }
}
