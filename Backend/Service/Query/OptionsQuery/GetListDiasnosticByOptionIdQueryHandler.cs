using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Service.Models.Options;
using System.Text.Json;

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

        public async Task<IEnumerable<DiasnosticModel>> Handle(GetListDiasnosticByOptionIdQuery request,CancellationToken cancellationToken)
        {
            var codeStore = Environment.GetEnvironmentVariable("CodeStore") ?? string.Empty;

            Console.WriteLine($"[DIASNOSTIC] Inicio Handle. OptionId={request.Id}, CodeStore={codeStore}");

            IEnumerable<DiasnosticModel> record;

            try
            {
                record = _repository.GetListDiasnosticById(request.Id)
                         ?? Enumerable.Empty<DiasnosticModel>();

                Console.WriteLine($"[DIASNOSTIC] Registros encontrados: {record.Count()}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[DIASNOSTIC][ERROR] Error obteniendo lista. OptionId={request.Id}");
                Console.WriteLine(ex.ToString());
                throw;
            }

            foreach (var item in record)
            {
                if (item == null)
                {
                    Console.WriteLine("[DIASNOSTIC] Item null, se omite.");
                    continue;
                }

                Console.WriteLine($"[DIASNOSTIC] Procesando Id={item.Id}, HasPicture={item.HasPicture}");

                if (item.HasPicture != true)
                    continue;

                try
                {
                    var currentId = $"{codeStore}_DIASNOSTIC_{item.Id}";

                    Console.WriteLine($"[DIASNOSTIC] Buscando cache. Key={currentId}");

                    string? valueCache = null;

                    try
                    {
                        valueCache = await _cache.GetStringAsync(currentId, cancellationToken);
                    }
                    catch (Exception cacheEx)
                    {
                        Console.WriteLine($"[DIASNOSTIC][CACHE][ERROR] Error leyendo Redis. Key={currentId}");
                        Console.WriteLine(cacheEx.ToString());
                    }

                    if (!string.IsNullOrWhiteSpace(valueCache))
                    {
                        Console.WriteLine($"[DIASNOSTIC] Cache encontrado. Key={currentId}, Length={valueCache.Length}");
                        item.Picture = valueCache;
                        continue;
                    }

                    Console.WriteLine($"[DIASNOSTIC] Cache vacío. Consultando imagen en BD. Id={item.Id}");

                    var pictureByte = _repository.GetPhotoDiasnosticById(item.Id);

                    if (pictureByte == null || pictureByte.Length == 0)
                    {
                        Console.WriteLine($"[DIASNOSTIC] Imagen vacía o null. Id={item.Id}");
                        item.Picture = null;
                        continue;
                    }

                    Console.WriteLine($"[DIASNOSTIC] Imagen obtenida. Id={item.Id}, Bytes={pictureByte.Length}");

                    var base64 = Convert.ToBase64String(pictureByte);

                    Console.WriteLine($"[DIASNOSTIC] Base64 generado. Id={item.Id}, Length={base64.Length}");

                    try
                    {
                        if (base64.Length <= 1_500_000)
                        {
                            await _cache.SetStringAsync(
                                currentId,
                                base64,
                                new DistributedCacheEntryOptions
                                {
                                    AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(12)
                                },
                                cancellationToken
                            );

                            Console.WriteLine($"[DIASNOSTIC] Cache guardado. Key={currentId}");
                        }
                        else
                        {
                            Console.WriteLine($"[DIASNOSTIC][WARN] Imagen muy grande, no se guarda en Redis. Id={item.Id}, Length={base64.Length}");
                        }
                    }
                    catch (Exception cacheEx)
                    {
                        Console.WriteLine($"[DIASNOSTIC][CACHE][ERROR] Error guardando Redis. Key={currentId}");
                        Console.WriteLine(cacheEx.ToString());
                    }

                    item.Picture = base64;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[DIASNOSTIC][ERROR] Error procesando imagen. Id={item.Id}");
                    Console.WriteLine(ex.ToString());

                    item.Picture = null;
                    continue;
                }
            }

            Console.WriteLine($"[DIASNOSTIC] Fin Handle. OptionId={request.Id}");

            return record;
        }
    }
}