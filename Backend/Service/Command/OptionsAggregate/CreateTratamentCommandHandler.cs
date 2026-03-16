using Domain.Entities.Options;
using MediatR;

namespace Service.Command.OptionsAggregate
{
    public class CreateTratamentCommandHandler : IRequestHandler<CreateTratamentCommand, Unit>
    {
        private readonly IOptionsRepository _repository;

        public CreateTratamentCommandHandler(IOptionsRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(CreateTratamentCommand request, CancellationToken cancellationToken)
        {
            var options = await _repository.FindByIdAsync(request.Id);

            if (options == null)
                throw new InvalidOperationException("No existe la opción para registrar el tratamiento");

            byte[] file = null;
            bool hasFile = false;

            if (!string.IsNullOrWhiteSpace(request.Picture))
            {
                string[] codeBase64 = request.Picture.Split(",");
                var tmp = codeBase64.Length > 1 ? codeBase64[1] : codeBase64[0];
                file = Convert.FromBase64String(tmp);
                hasFile = true;
            }

            options.CreateTratament(
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