using MediatR;
using Service.Models.Doctor;

namespace Service.Query.DoctorQuery
{
    public class GetAppointmentsByDoctorIdQueryHandler : IRequestHandler<GetAppointmentsByDoctorIdQuery, IEnumerable<DoctorAppointmentHourModel>>
    {
        private readonly IDoctorQueryRepository _repository;
        public GetAppointmentsByDoctorIdQueryHandler(IDoctorQueryRepository repository)
        {
            _repository = repository;
        }


        public Task<IEnumerable<DoctorAppointmentHourModel>> Handle(GetAppointmentsByDoctorIdQuery request, CancellationToken cancellationToken)
        {
            var record = _repository.GetAppointmentHourByDoctorId(request.DoctorId, request.Date);
            return Task.FromResult(record);
        }
    }
}
