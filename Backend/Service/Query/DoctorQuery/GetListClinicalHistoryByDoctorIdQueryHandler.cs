using MediatR;
using Service.Models.Patient;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

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
            var record = _repository.GetListClinicalHistoryByDoctorId(request.Id);
            return Task.FromResult(record);
        }
    }
}
