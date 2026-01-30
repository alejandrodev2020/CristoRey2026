using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Command.PatientAggregate
{
    public class LowPatientCommand : IRequest
    {
        public int Id { get; private set; }
        public void setId(int id)
        {
            Id = id;
        }
    }
}
