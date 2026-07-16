using Domain.Entities.AuthAggregate;
using Domain.Entities.DoctorAggregate;
using Domain.Entities.PatientAggregate;
using MediatR;
using Microsoft.AspNetCore.Http;
using Service.Models.Patient;
using System.Security.Claims;

namespace Service.Command.DoctorAggregate
{
    public class CreatePatientByDoctorCommandHandler : IRequestHandler<CreatePatientByDoctorCommand, PatientModel>
    {
        private readonly IPatientRepository _repository;
        private readonly IDoctorRepository _doctorRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CreatePatientByDoctorCommandHandler(IPatientRepository repository,
                                                   IDoctorRepository doctorRepository,
                                                   IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _doctorRepository = doctorRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<PatientModel> Handle(CreatePatientByDoctorCommand request, CancellationToken cancellationToken)
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                throw new ArgumentException("No se pudo identificar al usuario autenticado.");

            var doctor = await _doctorRepository.FindByAuthUserIdAsync(userId);
            if (doctor == null || doctor.IsActive != true)
                throw new ArgumentException("No se encontró un doctor activo para el usuario autenticado.");

            byte[] file = null;
            bool hasPhoto = false;
            if (!string.IsNullOrWhiteSpace(request.Photo))
            {
                var codeBase64 = request.Photo.Split(",");
                var base64 = codeBase64.Length > 1 ? codeBase64[1] : codeBase64[0];
                file = Convert.FromBase64String(base64);
                hasPhoto = true;
            }

            var record = Patient.CreatePatient(request.FirstName,
                                               request.LastName,
                                               request.Phone,
                                               request.Ci,
                                               request.Nit,
                                               file,
                                               hasPhoto,
                                               request.DepartamentId,
                                               request.CityId,
                                               request.GenderId,
                                               doctor.Id);

            var auth = AuthUser.CreateUser(firstname: request.FirstName,
                                           lastName: request.LastName,
                                           phone: request.Phone,
                                           ci: request.Ci,
                                           avatar: file,
                                           userName: request.Ci,
                                           userKey: request.Phone,
                                           isAdmin: false,
                                           authRoleId: Domain.Entities.Classifiers.AuthRole.Values.PATIENT);

            record.setAUthUser(auth);
            _repository.Add(record);
            await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            return new PatientModel
            {
                Id = record.Id,
                FirstName = record.FirstName,
                LastName = record.LastName,
                Phone = record.Phone,
                Ci = record.Ci,
                Nit = record.Nit,
                Ubication = record.Ubication,
                Company = record.Company,
                HasPhoto = record.HasPhoto,
                DoctorId = record.DoctorId
            };
        }
    }
}
