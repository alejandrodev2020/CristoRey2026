using Domain.Entities.AuthAggregate;
using MediatR;

namespace Service.Command.AuthAggregate
{
    public class CreateAuthUserCommandHandler : IRequestHandler<CreateAuthUserCommand, Unit>
    {
        private readonly IAuthUserRepository _repository;
        public CreateAuthUserCommandHandler(IAuthUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(CreateAuthUserCommand request, CancellationToken cancellationToken)
        {
            byte[] file = null;
            if (request.Avatar != null && request.Avatar != "")
            {
                string[] codeBase64 = request.Avatar.Split(",");
                var tmp = codeBase64[1];
                file = Convert.FromBase64String(tmp);

            }

            var record = AuthUser.CreateUser(request.FirstName, request.LastName,  request.Phone, request.Ci, file, request.UserName, request.UserKey, request.IsAdmin, request.AuthRoleId);
            _repository.Add(record);
            await _repository.UnitOfWork.SaveEntitiesAsync();
            return Unit.Value;
        }
    }
}
