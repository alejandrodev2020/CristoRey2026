using MediatR;
using Service.Models.IA;

namespace Service.Query.IAQuery
{
    public  class PromtQuery : IRequest<ResponseIAModel>
    {
        public string Prompt { get; set; }
    }
}
