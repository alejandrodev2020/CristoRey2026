using Domain.Entities.PatientAggregate;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Command.PatientAggregate
{
    public class RejectClinicalHistoryCommandHandler : IRequestHandler<RejectClinicalHistoryCommand, Unit>
    {
        private readonly IPatientRepository _repository;
        public RejectClinicalHistoryCommandHandler(IPatientRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(RejectClinicalHistoryCommand request, CancellationToken cancellationToken)
        {
            var statusAcept = 3;
            var record = await _repository.FindClinicalHistoryById(request.Id);
            var histoy = record.ClinicalHistorys.Where(ele => ele.Id.Equals(request.Id))
                                                .SingleOrDefault();

            histoy.setStatus(statusAcept);
            _repository.Update(record);
            await _repository.UnitOfWork.SaveEntitiesAsync();
            return Unit.Value;
        }
    }
}
