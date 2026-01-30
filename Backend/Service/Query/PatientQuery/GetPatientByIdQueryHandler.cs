using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Service.Models.Patient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Query.PatientQuery
{
    public class GetPatientByIdQueryHandler : IRequestHandler<GetPatientByIdQuery, PatientModel>
    {
        private readonly IPatientQueryRepository _repository;
        private readonly IDistributedCache _cache;
        public GetPatientByIdQueryHandler(IPatientQueryRepository repository, IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }

        public async Task<PatientModel> Handle(GetPatientByIdQuery request, CancellationToken cancellationToken)
        {

            var codeStore = Environment.GetEnvironmentVariable("CodeStore");
            var keyString = $"{request.Id}_{codeStore}_CLIENT";

            var picture = string.Empty;

            var record = _repository.GetPatientById(request.Id);
            if (record == null)
            {
                throw new Exception("Client not found");
            }

            if (record.HasPhoto.GetValueOrDefault())
            {
                picture = await _cache.GetStringAsync(keyString);
                if (string.IsNullOrEmpty(picture))
                {
                    var photoFile = _repository.GetPhoto(request.Id);
                    if (photoFile != null)
                    {
                        var imageBase64 = Convert.ToBase64String(photoFile);
                        await _cache.SetStringAsync(keyString, imageBase64, cancellationToken);
                        picture = imageBase64;
                    }
                }
                record.Photo = picture;
            }

            return record;
        }
    }
}
