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
    public class UpdatePatientCommandHandler : IRequestHandler<UpdatePatientCommand, Unit>
    {
        private readonly IPatientRepository _repository;
        public UpdatePatientCommandHandler(IPatientRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(UpdatePatientCommand request, CancellationToken cancellationToken)
        {

            byte[] file = null;
            bool hasPhoto = false;
            if (request.Photo != null && request.Photo != "")
            {
                string[] codeBase64 = request.Photo.Split(",");
                var tmp = codeBase64[1];
                file = Convert.FromBase64String(tmp);
                hasPhoto = true;
            }

            var record = await _repository.FindByIdAsync(request.Id);
            if (record != null)
            {
                record.UpdatePatient(request.FirstName, request.LastName, request.Phone, request.Ci,
                request.Nit, file, hasPhoto, request.DepartamentId,  request.CityId, request.GenderId, request.PatientZoneId,
                request.Ubication, request.Company, request.Latitude, request.Longitude, request.Reference, request.Link);
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
