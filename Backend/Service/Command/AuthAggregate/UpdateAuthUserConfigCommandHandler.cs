using Domain.Entities.AuthAggregate;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Service.Command.AuthAggregate
{
    public class UpdateAuthUserConfigCommandHandler : IRequestHandler<UpdateAuthUserConfigCommand, Unit>
    {
        private readonly IAuthUserRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UpdateAuthUserConfigCommandHandler(IAuthUserRepository repository, IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Unit> Handle(UpdateAuthUserConfigCommand request, CancellationToken cancellationToken)
        {
            var userIdString = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            int userId = int.Parse(userIdString);
            var user = await _repository.FindByIdAsync(userId);
            if (user != null)
            {
                var currentConfiguration = user.AuthUserConfiguration;
                currentConfiguration.UpdateConfiguration(request.AllItemsSale, request.CountItemsSale, request.printNoteSale, 
                                                         request.AllItemsShopping, request.countItemsShopping, request.printNoteShopping);
                _repository.Update(user);
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
