using Domain.Entities.Options;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Command.OptionsAggregate
{
    public class UpdateOptionsCommandHandler : IRequestHandler<UpdateOptionsCommand, Unit>
    {
        private readonly IOptionsRepository _repository;
        public UpdateOptionsCommandHandler(IOptionsRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(UpdateOptionsCommand request, CancellationToken cancellationToken)
        {
            byte[] file = null;
            bool hasFile = false;
            var Options = await _repository.FindByIdAsync(request.Id);
            if (Options != null)
            {

                if (request.Picture != null && request.Picture != "")
                {
                    string[] codeBase64 = request.Picture.Split(",");
                    var tmp = codeBase64[1];
                    file = Convert.FromBase64String(tmp);
                    hasFile = true;

                }

                Options.UpdateOptions(request.Title, request.Description, request.Code, hasFile, file);
                _repository.Update(Options);
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
