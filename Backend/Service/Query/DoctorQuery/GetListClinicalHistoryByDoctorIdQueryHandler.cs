using MediatR;
using Service.Models.Patient;

namespace Service.Query.DoctorQuery
{
    public class GetListClinicalHistoryByDoctorIdQueryHandler : IRequestHandler<GetListClinicalHistoryByDoctorIdQuery, IEnumerable<ClinicalHistoryModel>>
    {
        private readonly IDoctorQueryRepository _repository;
        public GetListClinicalHistoryByDoctorIdQueryHandler(IDoctorQueryRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<ClinicalHistoryModel>> Handle(GetListClinicalHistoryByDoctorIdQuery request, CancellationToken cancellationToken)
        {
            if (request.DateInit.HasValue != request.DateEnd.HasValue)
            {
                throw new ArgumentException("DateInit y DateEnd deben enviarse juntos.");
            }

            if (request.DateInit.HasValue && request.DateInit.Value.Date > request.DateEnd!.Value.Date)
            {
                throw new ArgumentException("DateInit no puede ser posterior a DateEnd.");
            }

            var record = _repository.GetListClinicalHistoryByDoctorId(
                request.Id,
                request.DateQuery,
                request.DateInit,
                request.DateEnd);

            foreach (var item in record)
            {
                if (item.Patient?.File != null && item.Patient.File.Length > 0)
                {
                    item.Patient.Photo = Convert.ToBase64String(item.Patient.File);
                }

                if (item.Doctor?.PhotoByte != null && item.Doctor.PhotoByte.Length > 0)
                {
                    item.Doctor.Photo = Convert.ToBase64String(item.Doctor.PhotoByte);
                }
            }

            return Task.FromResult(record);
        }
    }
}
