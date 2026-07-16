using Domain.Entities.Options;
using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Service.UtilsAggregate;

namespace Service.Command.OptionsAggregate
{
    public class CreateDiasnosticCommandHandler : IRequestHandler<CreateDiasnosticCommand, Unit>
    {
        private readonly IOptionsRepository _repository;
        private readonly IDistributedCache _cache;

        public CreateDiasnosticCommandHandler(IOptionsRepository repository,
                                               IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
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

            var createdDiasnostic = options.Diasnostics.Last();

            _repository.Update(options);
            await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            await OptionsPhotoCacheHelper.SetAsync(
                _cache,
                OptionsPhotoCacheHelper.DiasnosticKey(createdDiasnostic.Id),
                createdDiasnostic.Picture,
                cancellationToken);

            return Unit.Value;
        }
    }
}
