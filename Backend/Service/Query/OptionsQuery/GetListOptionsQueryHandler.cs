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
        public GetListOptionsQueryHandler(IOptionsQueryRepository repository,
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
                if (product.PictureByte != null)
                {
                    var tmp = Convert.ToBase64String(product.PictureByte);
                    var currentId = product.Id.ToString() + codeStore + "_OPTIONS_";
                    var valueText = JsonSerializer.Serialize(tmp);
                    await _cache.SetStringAsync(currentId, valueText);
                    product.Picture = Convert.ToBase64String(product.PictureByte);
                }
            }
            return record;
        }
    }
}
