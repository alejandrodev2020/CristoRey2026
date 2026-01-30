using Domain.Entities.AuthAggregate;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Service.Command.AuthAggregate
{
    public class UpdateResetPasswordCommandHandler : IRequestHandler<UpdateResetPasswordCommand, Unit>
    {
        private readonly IAuthUserRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UpdateResetPasswordCommandHandler(IAuthUserRepository repository, IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Unit> Handle(UpdateResetPasswordCommand request, CancellationToken cancellationToken)
        {
            var userIdString = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            int userId = int.Parse(userIdString);
            var Provider = await _repository.FindByIdAsync(userId);
            if (Provider != null)
            {
                if (Provider.UserKey == request.PreviousPassword)
                {
                    if (request.NewPassword == request.PasswordConfirmation)
                    {
                        Provider.UpdatePasswordReset(request.NewPassword);
                        _repository.Update(Provider);
                        await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);
                    }
                    else
                    {
                        throw new InvalidOperationException("La nueva contraseña son diferente");
                    }
                }else
                {
                    throw new InvalidOperationException("No existe considencia");
                }

            }
            else
            {
                throw new InvalidOperationException("No existe el registro a editar");
            }

            return Unit.Value;
        }
    }
}
