using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Service.Models.Options;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Query.OptionsQuery
{
    public class GetListTratamentByOptionIdQueryHandler : IRequestHandler<GetListTratamentByOptionIdQuery, IEnumerable<TratamentModel>>
    {
        private readonly IOptionsQueryRepository _repository;
        private readonly IDistributedCache _cache;
        public GetListTratamentByOptionIdQueryHandler(IOptionsQueryRepository repository,
                                                    IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }

        public async Task<IEnumerable<TratamentModel>> Handle(GetListTratamentByOptionIdQuery request, CancellationToken cancellationToken)
        {
            var codeStore = Environment.GetEnvironmentVariable("CodeStore");
            var record = _repository.GetListTratamentById(request.Id);
            foreach (var product in record)
            {
                if (product.PictureByte != null)
                {
                    var tmp = Convert.ToBase64String(product.PictureByte);
                    var currentId = product.Id.ToString() + codeStore + "_DIASNOSTIC_" + product.Id;
                    var valueText = JsonSerializer.Serialize(tmp);
                    await _cache.SetStringAsync(currentId, valueText);
                    product.Picture = Convert.ToBase64String(product.PictureByte);
                }
            }
            return record;
        }
    }
}
