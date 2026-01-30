using Domain.Entities.AuthAggregate;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Command.AuthAggregate
{
    public class LowAuthUserCommandHandler : IRequestHandler<LowAuthUserCommand, Unit>
    {
        private readonly IAuthUserRepository _repository;
        public LowAuthUserCommandHandler(IAuthUserRepository repository)
        {
            _repository = repository;
        }

        public  async Task<Unit> Handle(LowAuthUserCommand request, CancellationToken cancellationToken)
        {
            var record = await _repository.FindByIdAsync(request.Id);
            if (record != null)
            {
                record.LowAuthUser();
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
