using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Command.OptionsAggregate
{
    public class UpdateOptionsCommand : IRequest
    {
        public int Id { get; private set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public string Picture { get; set; }

        public void setId(int id)
        {
            Id = id;
        }
    }
}
