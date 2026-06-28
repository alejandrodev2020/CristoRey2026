using MediatR;
using Service.Models.Doctor;

namespace Service.Query.DoctorQuery
{
    public class GetListDoctorQueryHandler : IRequestHandler<GetListDoctorQuery, GetListDoctorModel>
    {
        private readonly IDoctorQueryRepository _repository;
        public GetListDoctorQueryHandler(IDoctorQueryRepository repository)
        {
            _repository = repository;
        }

        public Task<GetListDoctorModel> Handle(GetListDoctorQuery request, CancellationToken cancellationToken)
        {
            var record = _repository.GetListDoctor(
                request.IsEmergency,
                request.OnlyActive,
                request.RequiresPhoto,
                request.Limit,
                request.Page);

            if (request.RequiresPhoto != false)
            {
                foreach (var item in record.ListSale.Where(x => x.PhotoByte != null))
                {
                    item.Photo = Convert.ToBase64String(item.PhotoByte);
                }
            }

            return Task.FromResult(record);
        }
    }
}
