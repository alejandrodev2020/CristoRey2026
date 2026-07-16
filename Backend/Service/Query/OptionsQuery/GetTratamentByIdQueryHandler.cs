using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Service.Models.Options;
using Service.UtilsAggregate;

namespace Service.Query.OptionsQuery
{
    public class GetTratamentByIdQueryHandler : IRequestHandler<GetTratamentByIdQuery, TratamentModel>
    {
        private readonly IOptionsQueryRepository _repository;
        private readonly IDistributedCache _cache;
        public GetTratamentByIdQueryHandler(IOptionsQueryRepository repository,
                                            IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }

        public async Task<TratamentModel> Handle(GetTratamentByIdQuery request, CancellationToken cancellationToken)
        {
            var record = _repository.GetTratamentById(request.Id);

            if (record == null)
                return null;

            if (record.HasPicture != true)
                return record;

            record.Picture = await OptionsPhotoCacheHelper.GetOrCreateAsync(
                _cache,
                OptionsPhotoCacheHelper.TratamentKey(record.Id),
                () => _repository.GetPhotoTratamentById(record.Id),
                cancellationToken);

            return record;
        }
    }
}
