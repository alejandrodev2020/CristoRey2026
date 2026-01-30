using MediatR;
using Service.Models.Doctor;
using Service.Query.BasesQuery;

namespace Service.Query.DoctorQuery
{
    public class GetListDoctorQuery : BaseFilterQuery, IRequest<IEnumerable<DoctorModel>>
    {
    }
}
