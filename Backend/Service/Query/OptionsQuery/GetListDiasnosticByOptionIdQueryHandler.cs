using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Service.Models.Options;
using System.Text.Json;

namespace Service.Query.OptionsQuery
{
    public class GetListDiasnosticByOptionIdQueryHandler
        : IRequestHandler<GetListDiasnosticByOptionIdQuery, IEnumerable<DiasnosticModel>>
    {
        private readonly IOptionsQueryRepository _repository;
        private readonly IDistributedCache _cache;

        public GetListDiasnosticByOptionIdQueryHandler(
            IOptionsQueryRepository repository,
            IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }

        public async Task<IEnumerable<DiasnosticModel>> Handle(
            GetListDiasnosticByOptionIdQuery request,
            CancellationToken cancellationToken)
        {
            var codeStore = Environment.GetEnvironmentVariable("CodeStore") ?? string.Empty;

            var record = _repository.GetListDiasnosticById(request.Id);

            foreach (var item in record)
            {
                if (item == null || item.HasPicture != true)
                    continue;

                var currentId = item.Id.ToString() + codeStore + "_DIASNOSTIC_" + item.Id;

                var valueCache = await _cache.GetStringAsync(currentId, cancellationToken);

                if (!string.IsNullOrWhiteSpace(valueCache))
                {
                    item.Picture = JsonSerializer.Deserialize<string>(valueCache);
                    continue;
                }

                var pictureByte = _repository.GetPhotoDiasnosticById(item.Id);

                if (pictureByte == null || pictureByte.Length == 0)
                    continue;

                var base64 = Convert.ToBase64String(pictureByte);
                var valueText = JsonSerializer.Serialize(base64);

                await _cache.SetStringAsync(currentId, valueText, cancellationToken);

                item.Picture = base64;
            }

            return record;
        }
    }
}