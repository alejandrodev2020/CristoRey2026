using Domain.Entities.PatientAggregate;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Command.PatientAggregate
{
    public class UpdateClinicalHistoryCommandHandler : IRequestHandler<UpdateClinicalHistoryCommand, Unit>
    {
        private readonly IPatientRepository _repository;
        public UpdateClinicalHistoryCommandHandler(IPatientRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(UpdateClinicalHistoryCommand request, CancellationToken cancellationToken)
        {
            var record = await _repository.FindClinicalHistoryById(request.Id);
            var histoy = record.ClinicalHistorys.Where(ele => ele.Id.Equals(request.Id))
                                                .SingleOrDefault();

            histoy.updateClinicalHistory(request.Motive, request.Diagnostic, request.Observations, request.TotalCost, request.WasPaid);
            _repository.Update(record);
            await _repository.UnitOfWork.SaveEntitiesAsync();
            return Unit.Value;
        }
    }
}
