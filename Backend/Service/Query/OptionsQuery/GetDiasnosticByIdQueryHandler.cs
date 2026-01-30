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
    public class GetDiasnosticByIdQueryHandler : IRequestHandler<GetDiasnosticByIdQuery, DiasnosticModel>
    {
        private readonly IOptionsQueryRepository _repository;
        private readonly IDistributedCache _cache;
        public GetDiasnosticByIdQueryHandler(IOptionsQueryRepository repository,
                                                    IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }

        public async Task<DiasnosticModel> Handle(GetDiasnosticByIdQuery request, CancellationToken cancellationToken)
        {
            var codeStore = Environment.GetEnvironmentVariable("CodeStore");
            var record = _repository.GetDiasnosticById(request.Id);
         
            if (record.PictureByte != null)
            {
                var tmp = Convert.ToBase64String(record.PictureByte);
                var currentId = record.Id.ToString() + codeStore + "_DIASNOSTIC_" + record.Id;
                var valueText = JsonSerializer.Serialize(tmp);
                await _cache.SetStringAsync(currentId, valueText);
                record.Picture = Convert.ToBase64String(record.PictureByte);
            }
            
            return record;
        }
    }
}
