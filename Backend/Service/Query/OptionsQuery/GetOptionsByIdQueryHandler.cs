using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Service.Models.Options;
using Service.UtilsAggregate;

namespace Service.Query.OptionsQuery
{
    public class GetOptionsByIdQueryHandler : IRequestHandler<GetOptionsByIdQuery, OptionsModel>
    {
        private readonly IOptionsQueryRepository _repository;
        private readonly IDistributedCache _cache;

        public GetOptionsByIdQueryHandler(
            IOptionsQueryRepository repository,
            IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }

        public async Task<OptionsModel> Handle(GetOptionsByIdQuery request, CancellationToken cancellationToken)
        {
            var record = _repository.GetOptionsById(request.Id);

            if (record == null || record.HasPicture != true)
                return record;

            record.Picture = await OptionsPhotoCacheHelper.GetOrCreateAsync(
                _cache,
                OptionsPhotoCacheHelper.OptionsKey(record.Id),
                () => _repository.GetPhotoOptionsById(record.Id),
                cancellationToken);

            return record;
        }
    }
}
