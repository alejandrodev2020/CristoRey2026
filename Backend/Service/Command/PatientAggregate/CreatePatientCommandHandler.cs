using Domain.Entities.AuthAggregate;
using Domain.Entities.PatientAggregate;
using MediatR;
using Service.Models.Patient;

namespace Service.Command.PatientAggregate
{
    public class CreatePatientCommandHandler : IRequestHandler<CreatePatientCommand, PatientModel>
    {
        private readonly IPatientRepository _repository;
        public CreatePatientCommandHandler(IPatientRepository repository)
        {
            _repository = repository;
        }

        public async Task<PatientModel> Handle(CreatePatientCommand request, CancellationToken cancellationToken)
        {
            byte[] file = null;
            bool hasPhoto = false;
            if (request.Photo != null && request.Photo != "")
            {
                string[] codeBase64 = request.Photo.Split(",");
                var tmp = codeBase64[1];
                file = Convert.FromBase64String(tmp);
                hasPhoto = true;
            }
            var record = Patient.CreatePatient(request.FirstName, request.LastName, request.Phone, request.Ci, request.Nit,
                                              file, hasPhoto, request.DepartamentId, request.CityId, request.GenderId, request.DoctorId);

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
            await _repository.UnitOfWork.SaveEntitiesAsync();
            var patient = new PatientModel();
            patient.Id = record.Id;
            patient.FirstName = record.FirstName;
            patient.LastName = record.LastName;
            patient.Phone = record.Phone;
            patient.Ci = record.Ci;
            patient.Nit = record.Nit;
            patient.Ubication = record.Ubication;
            patient.Company = record.Company;
            patient.HasPhoto = record.HasPhoto;
            patient.Company = record.Company;
            patient.DoctorId = record.DoctorId;
            return patient;
        }
    }
}
