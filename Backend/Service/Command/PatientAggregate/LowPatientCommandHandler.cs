using Domain.Entities.PatientAggregate;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Command.PatientAggregate
{
    public class LowPatientCommandHandler : IRequestHandler<LowPatientCommand, Unit>
    {
        private readonly IPatientRepository _repository;
        public LowPatientCommandHandler(IPatientRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(LowPatientCommand request, CancellationToken cancellationToken)
        {
            var record = await _repository.FindByIdAsync(request.Id);
            if (record != null)
            {
                record.LowPatient();
                _repository.Update(record);
                await _repository.UnitOfWork.SaveEntitiesAsync();
            }
            else
            {
                throw new InvalidOperationException("No existe el registro a editar");
            }
            return Unit.Value;
        }
    }
}
