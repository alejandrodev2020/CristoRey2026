using MediatR;
using Service.Models.Options;
using Service.Query.BasesQuery;

namespace Service.Query.OptionsQuery
{
    public class GetListOptionsQuery : BaseFilterQuery, IRequest<IEnumerable<OptionsModel>>
    {
    }
}
