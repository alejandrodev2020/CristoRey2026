using MediatR;
using Service.Models.Doctor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Query.DoctorQuery
{
    public class GetDoctorByIdQuery : IRequest<DoctorModel>
    {
        public int Id { get; set; }
    }
}
