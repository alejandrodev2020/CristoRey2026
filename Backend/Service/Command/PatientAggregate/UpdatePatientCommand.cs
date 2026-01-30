using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Command.PatientAggregate
{
    public class UpdatePatientCommand : IRequest
    {
        internal int Id { get; private set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Ci { get; set; }
        public string Nit { get; set; }
        public string Photo { get; set; }
        public bool? HasPhoto { get; set; }
        public string Ubication { get; set; }
        public string Company { get; set; }
        public string Reference { get; set; }
        public string Link { get; set; }
        public int? DepartamentId { get; set; }
        public int? CityId { get; set; }
        public int? GenderId { get; set; }
        public int? PatientZoneId { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public void setId(int id)
        {
            Id = id;
        }
    }
}