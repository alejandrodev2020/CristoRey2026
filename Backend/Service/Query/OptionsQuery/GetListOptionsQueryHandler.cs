using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Service.Models.Options;
using System.Text.Json;

namespace Service.Query.OptionsQuery
{
    public class GetListOptionsQueryHandler : IRequestHandler<GetListOptionsQuery, IEnumerable<OptionsModel>>
    {
        private readonly IOptionsQueryRepository _repository;
        private readonly IDistributedCache _cache;

        public GetListOptionsQueryHandler(
            IOptionsQueryRepository repository,
            IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }

        public async Task<IEnumerable<OptionsModel>> Handle(GetListOptionsQuery request, CancellationToken cancellationToken)
        {
            var codeStore = Environment.GetEnvironmentVariable("CodeStore");
            var record = _repository.GetListOptionsByShopping();

            foreach (var product in record)
            {
                if (product == null || product.HasPicture != true)
                    continue;

                var currentId = product.Id.ToString() + codeStore + "_OPTIONS_" + product.Id;
                var valueCache = await _cache.GetStringAsync(currentId, cancellationToken);

                if (!string.IsNullOrEmpty(valueCache))
                {
                    product.Picture = JsonSerializer.Deserialize<string>(valueCache);
                    continue;
                }

                var pictureByte = _repository.GetPhotoOptionsById(product.Id);

                if (pictureByte != null)
                {
                    var base64 = Convert.ToBase64String(pictureByte);
                    var valueText = JsonSerializer.Serialize(base64);

                    await _cache.SetStringAsync(currentId, valueText, cancellationToken);
                    product.Picture = base64;
                }
            }

            return record;
        }
    }
}