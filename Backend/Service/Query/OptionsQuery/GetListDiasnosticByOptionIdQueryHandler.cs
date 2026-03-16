using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Service.Models.Options;
using System.Text.Json;

namespace Service.Query.OptionsQuery
{
    public class GetListDiasnosticByOptionIdQueryHandler : IRequestHandler<GetListDiasnosticByOptionIdQuery, IEnumerable<DiasnosticModel>>
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

        public async Task<IEnumerable<DiasnosticModel>> Handle(GetListDiasnosticByOptionIdQuery request, CancellationToken cancellationToken)
        {
            var codeStore = Environment.GetEnvironmentVariable("CodeStore");
            var record = _repository.GetListDiasnosticById(request.Id);

            foreach (var product in record)
            {
                if (product == null || product.HasPicture != true)
                    continue;

                var currentId = product.Id.ToString() + codeStore + "_DIASNOSTIC_" + product.Id;
                var valueCache = await _cache.GetStringAsync(currentId, cancellationToken);

                if (!string.IsNullOrEmpty(valueCache))
                {
                    product.Picture = JsonSerializer.Deserialize<string>(valueCache);
                    continue;
                }

                if (product.PictureByte != null)
                {
                    var base64 = Convert.ToBase64String(product.PictureByte);

                    await _cache.SetStringAsync(
                        currentId,
                        JsonSerializer.Serialize(base64),
                        cancellationToken
                    );

                    product.Picture = base64;
                }
            }

            return record;
        }
    }
}