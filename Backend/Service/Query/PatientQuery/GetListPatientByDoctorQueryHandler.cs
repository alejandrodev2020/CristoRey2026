using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Distributed;
using Service.Models.Patient;
using System.Security.Claims;

namespace Service.Query.PatientQuery
{
    public class GetListPatientByDoctorQueryHandler : IRequestHandler<GetListPatientByDoctorQuery, IEnumerable<PatientModel>>
    {
        private readonly IPatientQueryRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IDistributedCache _cache;
        public GetListPatientByDoctorQueryHandler(IPatientQueryRepository repository,
                                                  IHttpContextAccessor httpContextAccessor,
                                                  IDistributedCache cache)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
            _cache = cache;
        }

        public async Task<IEnumerable<PatientModel>> Handle(GetListPatientByDoctorQuery request, CancellationToken cancellationToken)
        {
            var httpContext = _httpContextAccessor.HttpContext
                    ?? throw new ArgumentException("No se pudo obtener el contexto HTTP.");

            var userIdString = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out int userId))
            {
                throw new ArgumentException("Usuario no válido.");
            }

            var doctor = _repository.GetDoctorByAuthUserId(userId);


            var patients = _repository.GetListPatientByDoctorId(doctor.Id,request.Search);

            if (!patients.Any())
                return patients;

            var codeStore = Environment.GetEnvironmentVariable("CodeStore");
            if (string.IsNullOrEmpty(codeStore))
                throw new InvalidOperationException("CodeStore no configurado");
            if (request.ReturnImage == true)
            {
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
            }



            return patients;
        }
    }
}
