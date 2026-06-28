using MediatR;
using Service.Models.Doctor;

namespace Service.Query.DoctorQuery
{
    public class GetDoctorByIdQuery : IRequest<DoctorModel>
    {
        public int Id { get; set; }
    }
}
