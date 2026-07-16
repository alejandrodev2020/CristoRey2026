using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Service.Models.Options;
using Service.UtilsAggregate;

namespace Service.Query.OptionsQuery
{
    public class GetListOptionsQueryHandler : IRequestHandler<GetListOptionsQuery, IEnumerable<OptionsModel>>
    {
        private readonly IOptionsQueryRepository _repository;
        private readonly IDistributedCache _cache;

        public GetListOptionsQueryHandler(
            IOptionsQueryRepository repository,
            IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }

        public async Task<IEnumerable<OptionsModel>> Handle(GetListOptionsQuery request, CancellationToken cancellationToken)
        {
            var record = _repository.GetListOptionsByShopping(request.Limit,request.Page).ToList();

            var photoTasks = record.Select(async product =>
            {
                if (product == null || product.HasPicture != true)
                    return;

                product.Picture = await OptionsPhotoCacheHelper.GetOrCreateAsync(
                    _cache,
                    OptionsPhotoCacheHelper.OptionsKey(product.Id),
                    () => _repository.GetPhotoOptionsById(product.Id),
                    cancellationToken);
            });

            await Task.WhenAll(photoTasks);

            return record;
        }
    }
}
