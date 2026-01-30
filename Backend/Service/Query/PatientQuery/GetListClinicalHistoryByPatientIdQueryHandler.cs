using MediatR;
using Service.Models.Patient;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Query.PatientQuery
{
    public class GetListClinicalHistoryByPatientIdQueryHandler : IRequestHandler<GetListClinicalHistoryByPatientIdQuery, IEnumerable<ClinicalHistoryModel>>
    {
        private readonly IPatientQueryRepository _repository;
        public GetListClinicalHistoryByPatientIdQueryHandler(IPatientQueryRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<ClinicalHistoryModel>> Handle(GetListClinicalHistoryByPatientIdQuery request, CancellationToken cancellationToken)
        {
            var record = _repository.GetListClinicalHistoryByPatientId(request.Id, request.DoctorId);
            return Task.FromResult(record);
        }
    }
}
