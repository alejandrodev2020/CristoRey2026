using Domain.Entities.AuthAggregate;
using MediatR;

namespace Service.Command.AuthAggregate
{
    public class UpdateAuthUserCommandHandler : IRequestHandler<UpdateAuthUserCommand, Unit>
    {
        private readonly IAuthUserRepository _repository;
        public UpdateAuthUserCommandHandler(IAuthUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(UpdateAuthUserCommand request, CancellationToken cancellationToken)
        {
            byte[] file = null;
            var Provider = await _repository.FindByIdAsync(request.Id);
            if (Provider != null)
            {

                if (request.Avatar != null && request.Avatar != "")
                {
                    string[] codeBase64 = request.Avatar.Split(",");
                    var tmp = codeBase64[1];
                    file = Convert.FromBase64String(tmp);
                }

                Provider.UpdateUser(request.FirstName, request.LastName, request.Phone, request.Ci, request.Nit, file, request.UserName);
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
