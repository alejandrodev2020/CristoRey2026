using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Service.Models.Options;
using Service.UtilsAggregate;

namespace Service.Query.OptionsQuery
{
    public class GetListDiasnosticByOptionIdQueryHandler
        : IRequestHandler<GetListDiasnosticByOptionIdQuery, IEnumerable<DiasnosticModel>>
    {
        private readonly IOptionsQueryRepository _repository;
        private readonly IDistributedCache _cache;

        public GetListDiasnosticByOptionIdQueryHandler(
            IOptionsQueryRepository repository,
            IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }

        public async Task<IEnumerable<DiasnosticModel>> Handle(GetListDiasnosticByOptionIdQuery request, CancellationToken cancellationToken)
        {
            var record = (_repository.GetListDiasnosticById(request.Id)
                          ?? Enumerable.Empty<DiasnosticModel>()).ToList();

            var photoTasks = record.Select(async item =>
            {
                if (item == null || item.HasPicture != true)
                    return;

                item.Picture = await OptionsPhotoCacheHelper.GetOrCreateAsync(
                    _cache,
                    OptionsPhotoCacheHelper.DiasnosticKey(item.Id),
                    () => _repository.GetPhotoDiasnosticById(item.Id),
                    cancellationToken);
            });

            await Task.WhenAll(photoTasks);

            return record;
        }
    }
}
