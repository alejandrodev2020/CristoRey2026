using MediatR;
using Service.Models.Options;

namespace Service.Query.OptionsQuery
{
    public class GetTratamentByIdQuery : IRequest<TratamentModel>
    {
        internal int Id { get; private set; }
        public void setId(int id)
        {
            Id = id;
        }
    }
}
