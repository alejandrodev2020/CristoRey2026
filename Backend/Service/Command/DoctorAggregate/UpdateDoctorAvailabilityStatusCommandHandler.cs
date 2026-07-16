using Domain.Entities.DoctorAggregate;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Service.Command.DoctorAggregate
{
    public class UpdateDoctorAvailabilityStatusCommandHandler : IRequestHandler<UpdateDoctorAvailabilityStatusCommand, Unit>
    {
        private readonly IDoctorRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UpdateDoctorAvailabilityStatusCommandHandler(IDoctorRepository repository,
                                                              IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Unit> Handle(UpdateDoctorAvailabilityStatusCommand request, CancellationToken cancellationToken)
        {
            if (request.AvailabilityStatusId < 1 || request.AvailabilityStatusId > 3)
            {
                throw new ArgumentException("El estado de disponibilidad debe ser 1, 2 o 3.");
            }

            var userIdClaim = _httpContextAccessor.HttpContext?.User
                .FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                throw new UnauthorizedAccessException("No se pudo identificar al usuario autenticado.");
            }

            var doctor = await _repository.FindByAuthUserIdAsync(userId);
            if (doctor == null)
            {
                throw new InvalidOperationException("No existe un doctor asociado al usuario autenticado.");
            }

            doctor.UpdateAvailabilityStatus(request.AvailabilityStatusId);

            _repository.Update(doctor);
            await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
