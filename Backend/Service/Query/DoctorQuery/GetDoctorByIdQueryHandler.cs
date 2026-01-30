using MediatR;
using Service.Models.Doctor;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Query.DoctorQuery
{
    public class GetDoctorByIdQueryHandler : IRequestHandler<GetDoctorByIdQuery, DoctorModel>
    {
        private readonly IDoctorQueryRepository _repository;
        public GetDoctorByIdQueryHandler(IDoctorQueryRepository repository)
        {
            _repository = repository;
        }

        public  Task<DoctorModel> Handle(GetDoctorByIdQuery request, CancellationToken cancellationToken)
        {
            var record = _repository.GetProviderById(request.Id);
            if (record.PhotoByte != null)
            {
                record.Photo = Convert.ToBase64String(record.PhotoByte);
            }
            return Task.FromResult(record);
        }
    }
}
