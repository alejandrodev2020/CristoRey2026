using Domain.Entities.Options;
using MediatR;
using Microsoft.Extensions.Caching.Distributed;

namespace Service.Command.OptionsAggregate
{
    public class UpdateTratamentCommandHandler : IRequestHandler<UpdateTratamentCommand, Unit>
    {
        private readonly IOptionsRepository _repository;
        private readonly IDistributedCache _cache;

        public UpdateTratamentCommandHandler(
            IOptionsRepository repository,
            IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }

        public async Task<Unit> Handle(UpdateTratamentCommand request, CancellationToken cancellationToken)
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

            var currentTratament = options.Trataments
                .SingleOrDefault(ele => ele.Id == request.TratamentId);

            if (currentTratament == null)
                throw new InvalidOperationException("No existe el tratamiento a editar");

            currentTratament.UpdateTratament(
                request.Title,
                request.Description,
                request.Code,
                hasFile,
                file
            );

            _repository.Update(options);
            await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            var codeStore = Environment.GetEnvironmentVariable("CodeStore") ?? string.Empty;

            var cacheKey = currentTratament.Id.ToString()
                           + codeStore
                           + "_TRATAMENT_"
                           + currentTratament.Id;

            await _cache.RemoveAsync(cacheKey, cancellationToken);

            return Unit.Value;
        }
    }
}