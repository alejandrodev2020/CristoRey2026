using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Service.Models.Patient;

namespace Service.Query.PatientQuery
{
    public class GetListPatientQueryHandler : IRequestHandler<GetListPatientQuery, IEnumerable<PatientModel>>
    {
        private readonly IPatientQueryRepository _repository;
        private readonly IDistributedCache _cache;
        public GetListPatientQueryHandler(IPatientQueryRepository repository,
                                         IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }

        public async Task<IEnumerable<PatientModel>> Handle(GetListPatientQuery request, CancellationToken cancellationToken)
        {
            var patients = _repository.GetListPatient(request.DoctorId);

            if (!patients.Any())
                return patients;

            var codeStore = Environment.GetEnvironmentVariable("CodeStore");
            if (string.IsNullOrEmpty(codeStore))
                throw new InvalidOperationException("CodeStore no configurado");

            foreach (var patient in patients)
            {
                if (!patient.HasPhoto.GetValueOrDefault())
                    continue;

                var cacheKey = $"{patient.Id}_{codeStore}_PATIENT_PHOTO";

                var cachedPhoto = await _cache.GetStringAsync(cacheKey, cancellationToken);
                if (!string.IsNullOrEmpty(cachedPhoto))
                {
                    patient.Photo = cachedPhoto;
                    continue;
                }

                var photoFile = _repository.GetPhoto(patient.Id);

                if (photoFile == null || photoFile.Length == 0)
                {
                    // cache negativo (evita hits repetidos a DB)
                    await _cache.SetStringAsync(
                        cacheKey,
                        string.Empty,
                        new DistributedCacheEntryOptions
                        {
                            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
                        },
                        cancellationToken
                    );
                    continue;
                }

                var base64 = Convert.ToBase64String(photoFile);

                await _cache.SetStringAsync(
                    cacheKey,
                    base64,
                    new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(6),
                        SlidingExpiration = TimeSpan.FromHours(1)
                    },
                    cancellationToken
                );

                patient.Photo = base64;
            }

            return patients;
        }
    }
}
