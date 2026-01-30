using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Command.OptionsAggregate
{
    public class CreateDiasnosticCommand : IRequest
    {
        internal int Id { get; private set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public string Picture { get; set; }
        public void setOptionId(int id)
        {
            Id = id;
        }
    }
}
