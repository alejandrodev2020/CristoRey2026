using Domain.Entities.Options;
using Domain.Entities.PatientAggregate;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Command.PatientAggregate
{
    public class CreateClinicalHistoryCommandHandler : IRequestHandler<CreateClinicalHistoryCommand, Unit>
    {
        private readonly IPatientRepository _repository;
        private readonly IOptionsRepository _repositoryOptions;
        public CreateClinicalHistoryCommandHandler(IPatientRepository repository,
                                                   IOptionsRepository repositoryOptions)
        {
            _repository = repository;
            _repositoryOptions = repositoryOptions;
        }

        public async Task<Unit> Handle(CreateClinicalHistoryCommand request, CancellationToken cancellationToken)
        {
            var record = await _repository.FindByIdAsync(request.Id);
            var motiveText = "";
            if (request.OptionId == 0)
            {
                motiveText = request.Motive;
            }
            else 
            {
                var t =  await _repositoryOptions.FindByIdAsyncAsnoTraking(request.OptionId);
                motiveText = t.Description;
            }

            DateTime myDate = DateTime.Now;
            if (request.DateQuery != null) 
            {
                myDate = request.DateQuery.Value;
            }
            record.CreateClinicHistory(request.DoctorId, myDate,
                motiveText,                
                request.Diagnostic,
                request.Observations,request.TotalCost,request.WasPaid);
            _repository.Update(record);
            await _repository.UnitOfWork.SaveEntitiesAsync();
            return Unit.Value;
        }
    }
}
