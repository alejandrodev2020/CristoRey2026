using MediatR;
using Service.Models.Options;
using System.Collections.Generic;

namespace Service.Query.OptionsQuery
{
    public class GetListDiasnosticByOptionIdQuery : IRequest<IEnumerable<DiasnosticModel>>
    {
        internal int Id { get; private set; }
        public void setId(int id)
        {
            Id = id;
        }
    }
}
