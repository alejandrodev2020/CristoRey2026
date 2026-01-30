using Domain.Entities.AuthAggregate;
using Domain.Entities.DoctorAggregate;
using MediatR;
using Service.Models.Doctor;
using System.Globalization;

namespace Service.Command.DoctorAggregate
{
    public class CreateDoctorCommandHandler : IRequestHandler<CreateDoctorCommand, DoctorModel>
    {
        private readonly IDoctorRepository _repository;
        public CreateDoctorCommandHandler(IDoctorRepository reposititory)
        {
            _repository = reposititory;
        }

        public async Task<DoctorModel> Handle(CreateDoctorCommand request, CancellationToken cancellationToken)
        {
            byte[] file = null;
            bool hasFile = false;
            if (request.Photo != null && request.Photo != "")
            {
                string[] codeBase64 = request.Photo.Split(",");
                var tmp = codeBase64[1];
                file = Convert.FromBase64String(tmp);
                hasFile=true;

            }


            string? latStr = request.Latitude;
            string? lngStr = request.Longitude;

            double lat = 0;
            double lng = 0;

            double.TryParse(latStr, NumberStyles.Any, CultureInfo.InvariantCulture, out lat);
            double.TryParse(lngStr, NumberStyles.Any, CultureInfo.InvariantCulture, out lng);

            string url = "";




            if (lat != 0 && lng != 0)
            {
                url = $"https://www.google.com/maps?q={request.Latitude},{request.Longitude}";
            }
            else
            {
                url = "";
            }


            var record = Doctor.CreateDoctor(firstname: request.FirstName, 
                                            lastName: request.LastName, 
                                            phone: request.Phone, 
                                            ci: request.Ci, 
                                            nit: request.Nit,
                                            file:file,
                                            hasPhoto: hasFile,
                                            clientZoneId: 1,
                                            ubication: request.Ubication,
                                            latitude: lat,
                                            longitude: lng,
                                            link : url,
                                            company:request.businessName,
                                            isEmergency: request.IsEmergency);
            
            var auth = AuthUser.CreateUser(firstname: request.FirstName,
                                            lastName: request.LastName,
                                            phone:request.Phone,
                                            ci:request.Ci,
                                            avatar: file,
                                            userName:request.Ci,
                                            userKey: request.Phone,
                                            isAdmin: false,
                                            authRoleId : Domain.Entities.Classifiers.AuthRole.Values.DOCTOR);

            record.setAUthUser(auth);

            _repository.Add(record);
            await _repository.UnitOfWork.SaveEntitiesAsync();

            var formatData = new DoctorModel();
            formatData.Id = record.Id;
            formatData.FirstName = record.FirstName;
            return formatData;
        }
    }
}
