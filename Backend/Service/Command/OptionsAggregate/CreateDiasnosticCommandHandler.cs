using Domain.Entities.Options;
using MediatR;

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
            var options = await _repository.FindByIdAsync(request.Id);

            if (options == null)
                throw new InvalidOperationException("No existe la opción para registrar el diagnóstico");

            byte[] file = null;
            bool hasFile = false;

            if (!string.IsNullOrWhiteSpace(request.Picture))
            {
                string[] codeBase64 = request.Picture.Split(",");
                var tmp = codeBase64.Length > 1 ? codeBase64[1] : codeBase64[0];
                file = Convert.FromBase64String(tmp);
                hasFile = true;
            }

            options.CreateDiasnostic(
                optionsId: request.Id,
                title: request.Title,
                description: request.Description,
                code: request.Code,
                hasPicture: hasFile,
                picture: file
            );

            _repository.Update(options);
            await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}