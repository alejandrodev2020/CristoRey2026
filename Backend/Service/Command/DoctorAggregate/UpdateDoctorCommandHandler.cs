using Domain.Entities.DoctorAggregate;
using MediatR;
using System;
using System.Globalization;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Command.DoctorAggregate
{
    public class UpdateDoctorCommandHandler : IRequestHandler<UpdateDoctorCommand, Unit>
    {

        private readonly IDoctorRepository _repository;
        public UpdateDoctorCommandHandler(IDoctorRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(UpdateDoctorCommand request, CancellationToken cancellationToken)
        {
            byte[] file = null;
            var Provider = await _repository.FindByIdAsync(request.Id);
            if (Provider != null)
            {
                // Procesar foto si existe
                if (!string.IsNullOrWhiteSpace(request.Photo))
                {
                    var parts = request.Photo.Split(",");
                    file = Convert.FromBase64String(parts[1]);
                }

                // LAT / LNG → convertir correctamente a double
                double lat = 0;
                double lng = 0;

                double.TryParse(request.Latitude, NumberStyles.Any, CultureInfo.InvariantCulture, out lat);
                double.TryParse(request.Longitude, NumberStyles.Any, CultureInfo.InvariantCulture, out lng);

                // Crear URL solo si lat y lng tienen valores válidos
                string link = string.Empty;

                if (!string.IsNullOrWhiteSpace(request.Latitude) &&
                    !string.IsNullOrWhiteSpace(request.Longitude))
                {
                    link = $"https://www.google.com/maps?q={request.Latitude},{request.Longitude}";
                }

                // Llamar a tu método UpdateDoctor con los nuevos parámetros
                Provider.UpdateDoctor(
                    firstname: request.FirstName,
                    lastName: request.LastName,
                    phone: request.Phone,
                    ci: request.Ci,
                    nit: request.Nit,
                    photo: file,
                    businessName: request.BusinessName,
                    ubication: request.Ubication,
                    latitude: lat,
                    longitude: lng,
                    link: link,
                    isEmergency: request.IsEmergency
                );

                _repository.Update(Provider);
                await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);
            }
            else
            {
                throw new InvalidOperationException("No existe el registro a editar");
            }

            return Unit.Value;
        }
    }
}