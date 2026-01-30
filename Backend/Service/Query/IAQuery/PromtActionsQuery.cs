using MediatR;
using Service.Models.IA;

namespace Service.Query.IAQuery
{
    public class PromtActionsQuery : IRequest<ResponseIAModel>
    {
        public string Prompt { get; set; }
        public string? threadId { get; set; }
        public int? WarehouseId { get; set; }
        public bool Production { get; set; } = false;   
    }
}
