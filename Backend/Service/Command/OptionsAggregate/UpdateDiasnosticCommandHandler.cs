using Domain.Entities.Options;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Command.OptionsAggregate
{
    public class UpdateDiasnosticCommandHandler : IRequestHandler<UpdateDiasnosticCommand, Unit>
    {
        private readonly IOptionsRepository _repository;
        public UpdateDiasnosticCommandHandler(IOptionsRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(UpdateDiasnosticCommand request, CancellationToken cancellationToken)
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

                var currentDiasnostic = Options.Diasnostics.Where((ele)=> ele.Id.Equals(request.DiasnosticId)).LastOrDefault();

                if (currentDiasnostic != null)
                {
                    currentDiasnostic.UpdateDiasnostic(request.Title, request.Description, request.Code, hasFile, file);
                }
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
