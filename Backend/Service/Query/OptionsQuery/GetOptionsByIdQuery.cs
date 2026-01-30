using MediatR;
using Service.Models.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Query.OptionsQuery
{
    public class GetOptionsByIdQuery : IRequest<OptionsModel>
    {
        public int Id { get; set; }
    }
}
