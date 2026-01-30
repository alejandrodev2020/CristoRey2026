using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Command.DoctorAggregate
{
    public class UpdateDoctorCommand : IRequest
    {
        public int Id { get; private set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Ci { get; set; }
        public string Nit { get; set; }
        public string Photo { get; set; }
        public string Ubication { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string BusinessName { get; set; }
        public bool? IsEmergency { get; set; }
        public void setId(int id)
        {
            Id = id;
        }
    }
}
