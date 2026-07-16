using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Service.Models.Options;
using Service.UtilsAggregate;

namespace Service.Query.OptionsQuery
{
    public class GetDiasnosticByIdQueryHandler : IRequestHandler<GetDiasnosticByIdQuery, DiasnosticModel>
    {
        private readonly IOptionsQueryRepository _repository;
        private readonly IDistributedCache _cache;

        public GetDiasnosticByIdQueryHandler(
            IOptionsQueryRepository repository,
            IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }

        public async Task<DiasnosticModel> Handle(GetDiasnosticByIdQuery request, CancellationToken cancellationToken)
        {
            var record = _repository.GetDiasnosticById(request.Id);

            if (record == null)
                return null;

            if (record.HasPicture != true)
                return record;

            record.Picture = await OptionsPhotoCacheHelper.GetOrCreateAsync(
                _cache,
                OptionsPhotoCacheHelper.DiasnosticKey(record.Id),
                () => _repository.GetPhotoDiasnosticById(record.Id),
                cancellationToken);

            return record;
        }
    }
}
