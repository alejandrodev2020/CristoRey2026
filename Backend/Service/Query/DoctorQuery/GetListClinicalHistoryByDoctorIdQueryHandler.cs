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
            var record = _repository.GetListClinicalHistoryByDoctorId(request.Id,request.DateQuery);

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
