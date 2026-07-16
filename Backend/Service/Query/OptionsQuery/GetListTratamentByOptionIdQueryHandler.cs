using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Service.Models.Options;
using Service.UtilsAggregate;

namespace Service.Query.OptionsQuery
{
    public class GetListTratamentByOptionIdQueryHandler
        : IRequestHandler<GetListTratamentByOptionIdQuery, IEnumerable<TratamentModel>>
    {
        private readonly IOptionsQueryRepository _repository;
        private readonly IDistributedCache _cache;

        public GetListTratamentByOptionIdQueryHandler(
            IOptionsQueryRepository repository,
            IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }

        public async Task<IEnumerable<TratamentModel>> Handle(
            GetListTratamentByOptionIdQuery request,
            CancellationToken cancellationToken)
        {
            var record = _repository.GetListTratamentById(request.Id).ToList();

            var photoTasks = record.Select(async item =>
            {
                if (item == null || item.HasPicture != true)
                    return;

                item.Picture = await OptionsPhotoCacheHelper.GetOrCreateAsync(
                    _cache,
                    OptionsPhotoCacheHelper.TratamentKey(item.Id),
                    () => _repository.GetPhotoTratamentById(item.Id),
                    cancellationToken);
            });

            await Task.WhenAll(photoTasks);

            return record;
        }
    }
}
