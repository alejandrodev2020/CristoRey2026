using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Service.Models.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Query.OptionsQuery
{
    public class GetOptionsByIdQueryHandler : IRequestHandler<GetOptionsByIdQuery, OptionsModel>
    {
        private readonly IOptionsQueryRepository _repository;
        private readonly IDistributedCache _cache;
        public GetOptionsByIdQueryHandler(IOptionsQueryRepository repository,
                                          IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }

        public async Task<OptionsModel> Handle(GetOptionsByIdQuery request, CancellationToken cancellationToken)
        {
            var record = _repository.GetOptionsById(request.Id);
            var codeStore = Environment.GetEnvironmentVariable("CodeStore");

            if (record != null && record.PictureByte != null)
            {
                var base64Picture = Convert.ToBase64String(record.PictureByte);
                var currentId = record.Id.ToString() + codeStore + "_OPTIONS_";
                var valueText = JsonSerializer.Serialize(base64Picture);

                await _cache.SetStringAsync(currentId, valueText, cancellationToken);

                record.Picture = base64Picture;
            }

            return record;
        }
    }
}
