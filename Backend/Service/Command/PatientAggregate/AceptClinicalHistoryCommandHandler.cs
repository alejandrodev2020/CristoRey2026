using Domain.Entities.PatientAggregate;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Command.PatientAggregate
{
    public class AceptClinicalHistoryCommandHandler : IRequestHandler<AceptClinicalHistoryCommand, Unit>
    {
        private readonly IPatientRepository _repository;
        public AceptClinicalHistoryCommandHandler(IPatientRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(AceptClinicalHistoryCommand request, CancellationToken cancellationToken)
        {
            var statusAcept = 2;
            var record = await  _repository.FindClinicalHistoryById(request.Id);
            var histoy = record.ClinicalHistorys.Where(ele => ele.Id.Equals(request.Id))
                                                .SingleOrDefault();

            histoy.setStatus(statusAcept);
            _repository.Update(record);
            await _repository.UnitOfWork.SaveEntitiesAsync();
            return Unit.Value;
        }
    }
}
