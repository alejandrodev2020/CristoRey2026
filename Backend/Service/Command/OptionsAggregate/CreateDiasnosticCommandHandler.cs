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
    public class CreateDiasnosticCommandHandler : IRequestHandler<CreateDiasnosticCommand, Unit>
    {
        private readonly IOptionsRepository _repository;
        public CreateDiasnosticCommandHandler(IOptionsRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(CreateDiasnosticCommand request, CancellationToken cancellationToken)
        {
            var Options = await _repository.FindByIdAsync(request.Id);

            byte[] file = null;
            bool hasFile = false;
            if (request.Picture != null && request.Picture != "")
            {
                string[] codeBase64 = request.Picture.Split(",");
                var tmp = codeBase64[1];
                file = Convert.FromBase64String(tmp);
                hasFile = true;
            }

            Options.CreateDiasnostic(optionsId: request.Id,
                                     title: request.Title,
                                     description: request.Description,
                                     code: request.Code,
                                     hasPicture : hasFile, 
                                     picture: file) ;







            _repository.Update(Options);
            await _repository.UnitOfWork.SaveEntitiesAsync();


            return Unit.Value;
        }
    }
}
