using Domain.Entities.Options;
using MediatR;
using Microsoft.Extensions.Caching.Distributed;

namespace Service.Command.OptionsAggregate
{
    public class UpdateDiasnosticCommandHandler : IRequestHandler<UpdateDiasnosticCommand, Unit>
    {
        private readonly IOptionsRepository _repository;
        private readonly IDistributedCache _cache;

        public UpdateDiasnosticCommandHandler(
            IOptionsRepository repository,
            IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }

        public async Task<Unit> Handle(UpdateDiasnosticCommand request, CancellationToken cancellationToken)
        {
            byte[] file = null;
            bool hasFile = false;

            var options = await _repository.FindByIdAsync(request.Id);

            if (options == null)
                throw new InvalidOperationException("No existe el registro a editar");

            if (!string.IsNullOrWhiteSpace(request.Picture))
            {
                string[] codeBase64 = request.Picture.Split(",");
                var tmp = codeBase64.Length > 1 ? codeBase64[1] : codeBase64[0];

                file = Convert.FromBase64String(tmp);
                hasFile = true;
            }

            var currentDiasnostic = options.Diasnostics
                .SingleOrDefault(ele => ele.Id == request.DiasnosticId);

            if (currentDiasnostic == null)
                throw new InvalidOperationException("No existe el diagnóstico a editar");

            currentDiasnostic.UpdateDiasnostic(
                request.Title,
                request.Description,
                request.Code,
                hasFile,
                file
            );

            _repository.Update(options);
            await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            var codeStore = Environment.GetEnvironmentVariable("CodeStore") ?? string.Empty;

            var cacheKey = currentDiasnostic.Id.ToString()
                           + codeStore
                           + "_DIASNOSTIC_"
                           + currentDiasnostic.Id;

            await _cache.RemoveAsync(cacheKey, cancellationToken);

            return Unit.Value;
        }
    }
}