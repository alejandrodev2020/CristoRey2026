using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Service.Models.Options;
using System.Text.Json;

namespace Service.Query.OptionsQuery
{
    public class GetDiasnosticByIdQueryHandler : IRequestHandler<GetDiasnosticByIdQuery, DiasnosticModel>
    {
        private readonly IOptionsQueryRepository _repository;
        private readonly IDistributedCache _cache;

        public GetDiasnosticByIdQueryHandler(
            IOptionsQueryRepository repository,
            IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }

        public async Task<DiasnosticModel> Handle(GetDiasnosticByIdQuery request, CancellationToken cancellationToken)
        {
            var codeStore = Environment.GetEnvironmentVariable("CodeStore");
            var record = _repository.GetDiasnosticById(request.Id);

            if (record == null)
                return null;

            if (record.HasPicture != true)
                return record;

            var currentId = record.Id.ToString() + codeStore + "_DIASNOSTIC_" + record.Id;

            var cacheValue = await _cache.GetStringAsync(currentId, cancellationToken);

            if (!string.IsNullOrEmpty(cacheValue))
            {
                record.Picture = JsonSerializer.Deserialize<string>(cacheValue);
                return record;
            }

            var pictureByte = _repository.GetPhotoDiasnosticById(request.Id);

            if (pictureByte != null)
            {
                var base64 = Convert.ToBase64String(pictureByte);

                await _cache.SetStringAsync(
                    currentId,
                    JsonSerializer.Serialize(base64),
                    cancellationToken
                );

                record.Picture = base64;
            }

            return record;
        }
    }
}