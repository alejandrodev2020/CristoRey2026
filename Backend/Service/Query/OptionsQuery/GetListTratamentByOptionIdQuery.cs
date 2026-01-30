using MediatR;
using Service.Models.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Query.OptionsQuery
{
    public class GetListTratamentByOptionIdQuery : IRequest<IEnumerable<TratamentModel>>
    {
        internal int Id { get; private set; }
        public void setId(int id)
        {
            Id = id;
        }
    }
}
