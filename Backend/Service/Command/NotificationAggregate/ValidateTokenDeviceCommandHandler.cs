using Domain.Entities.AuthAggregate;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Service.Command.NotificationAggregate
{
    public class ValidateTokenDeviceCommandHandler : IRequestHandler<ValidateTokenDeviceCommand, bool>
    {
        private readonly IAuthUserRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ValidateTokenDeviceCommandHandler(
            IAuthUserRepository repository,
            IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<bool> Handle(ValidateTokenDeviceCommand request, CancellationToken cancellationToken)
        {
            var userIdString = _httpContextAccessor.HttpContext?
                .User?
                .FindFirst(ClaimTypes.NameIdentifier)?
                .Value;

            if (string.IsNullOrWhiteSpace(userIdString))
            {
                throw new UnauthorizedAccessException("No se pudo identificar el usuario autenticado.");
            }

            if (!int.TryParse(userIdString, out int userId))
            {
                throw new InvalidOperationException("El identificador del usuario autenticado no es válido.");
            }

            var user = await _repository.FindByIdAsync(userId);

            if (user == null)
            {
                throw new InvalidOperationException("No existe el usuario autenticado.");
            }

            var exists = user.Devices != null &&
                         user.Devices.Any(x => x.DeviceToken == request.DeviceToken);

            return exists;
        }
    }
}