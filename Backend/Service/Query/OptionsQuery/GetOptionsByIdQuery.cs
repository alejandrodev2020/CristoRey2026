using MediatR;
using Service.Models.Options;

namespace Service.Query.OptionsQuery
{
    public class GetOptionsByIdQuery : IRequest<OptionsModel>
    {
        public int Id { get; set; }
    }
}
