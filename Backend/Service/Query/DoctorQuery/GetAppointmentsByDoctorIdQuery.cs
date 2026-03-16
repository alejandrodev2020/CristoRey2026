using MediatR;
using Service.Models.Doctor;

namespace Service.Query.DoctorQuery
{
    public class GetAppointmentsByDoctorIdQuery : IRequest<IEnumerable<DoctorAppointmentHourModel>>
    {
        internal int DoctorId { get; private set; }
        public DateTime Date { get; set; }

        public void SetDoctorId(int id)
        {
            DoctorId = id;
        }
    }
}