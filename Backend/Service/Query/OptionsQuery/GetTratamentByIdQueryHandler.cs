using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Service.Models.Options;
using System.Text.Json;

namespace Service.Query.OptionsQuery
{
    public class GetTratamentByIdQueryHandler : IRequestHandler<GetTratamentByIdQuery, TratamentModel>
    {
        private readonly IOptionsQueryRepository _repository;
        private readonly IDistributedCache _cache;
        public GetTratamentByIdQueryHandler(IOptionsQueryRepository repository,
                                            IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }

        public async Task<TratamentModel> Handle(GetTratamentByIdQuery request, CancellationToken cancellationToken)
        {
            var codeStore = Environment.GetEnvironmentVariable("CodeStore");
            var record = _repository.GetTratamentById(request.Id);

            if (record == null)
                return null;

            if (record.HasPicture != true)
                return record;

            var currentId = record.Id.ToString() + codeStore + "_TRATAMENT_" + record.Id;
            var valueCache = await _cache.GetStringAsync(currentId, cancellationToken);

            if (!string.IsNullOrEmpty(valueCache))
            {
                record.Picture = JsonSerializer.Deserialize<string>(valueCache);
                return record;
            }

            var pictureByte = _repository.GetPhotoTratamentById(request.Id);

            if (pictureByte != null)
            {
                var base64 = Convert.ToBase64String(pictureByte);
                var valueText = JsonSerializer.Serialize(base64);

                await _cache.SetStringAsync(
                    currentId,
                    valueText,
                    new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(12)
                    },
                    cancellationToken
                );

                record.Picture = base64;
            }

            return record;
        }
    }
}
