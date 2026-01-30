using Domain.Entities.Options;
using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Command.OptionsAggregate
{
    public class CreateOptionsCommandHandler : IRequestHandler<CreateOptionsCommand, Unit>
    {
        private readonly IOptionsRepository _repository;
        private readonly IDistributedCache _cache;
        public CreateOptionsCommandHandler(IOptionsRepository repository,
                                           IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }


        public async Task<Unit> Handle(CreateOptionsCommand request, CancellationToken cancellationToken)
        {
            byte[] file = null;
            bool hasFile = false;
            if (request.Picture != null && request.Picture != "")
            {
                string[] codeBase64 = request.Picture.Split(",");
                var tmp = codeBase64[1];
                file = Convert.FromBase64String(tmp);
                hasFile = true;
            }
            var record = Options.CreateOptions(request.Title, request.Description, request.Code, hasFile, file);
       
            _repository.Add(record);
            await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

            if (request.Picture != null && request.Picture != "")
            {
                var codeStore = Environment.GetEnvironmentVariable("CodeStore");
                var keyString = record.Id.ToString() + codeStore + "_OPTION_";
                var imageBase64 = Convert.ToBase64String(record.Picture);
                await _cache.SetStringAsync(keyString, imageBase64);
            }
            return Unit.Value;
        }
    }
}
