using MediatR;
using Service.Models.Doctor;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Query.DoctorQuery
{
    public class GetListDoctorQueryHandler : IRequestHandler<GetListDoctorQuery, IEnumerable<DoctorModel>>
    {
        private readonly IDoctorQueryRepository _repository;
        public GetListDoctorQueryHandler(IDoctorQueryRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<DoctorModel>> Handle(GetListDoctorQuery request, CancellationToken cancellationToken)
        {

            var record = _repository.GetListProvider();
            foreach (var item  in record)
            {
                var currentItem = item;
                if(currentItem.PhotoByte != null)
                {
                    item.Photo = Convert.ToBase64String(item.PhotoByte);
                }
            }

            return Task.FromResult(record);

        }
    }
}
