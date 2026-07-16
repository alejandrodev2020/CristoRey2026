using Microsoft.Extensions.Caching.Distributed;

namespace Service.UtilsAggregate
{
    public static class OptionsPhotoCacheHelper
    {
        private static string Prefix => Environment.GetEnvironmentVariable("CodeStore") ?? "CRISTOREY";

        public static string OptionsKey(int id) => $"{Prefix}:OPTIONS:PHOTO:{id}";
        public static string TratamentKey(int id) => $"{Prefix}:TRATAMENT:PHOTO:{id}";
        public static string DiasnosticKey(int id) => $"{Prefix}:DIASNOSTIC:PHOTO:{id}";

        public static async Task<string?> GetOrCreateAsync(
            IDistributedCache cache,
            string key,
            Func<byte[]?> getPicture,
            CancellationToken cancellationToken)
        {
            try
            {
                var cachedPicture = await cache.GetStringAsync(key, cancellationToken);
                if (!string.IsNullOrWhiteSpace(cachedPicture))
                {
                    return cachedPicture;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[CACHE][READ][ERROR] Key={key}. {ex.Message}");
            }

            var picture = getPicture();
            if (picture == null || picture.Length == 0)
            {
                return null;
            }

            var base64 = Convert.ToBase64String(picture);
            await SetAsync(cache, key, picture, cancellationToken);
            return base64;
        }

        public static async Task SetAsync(
            IDistributedCache cache,
            string key,
            byte[]? picture,
            CancellationToken cancellationToken)
        {
            try
            {
                if (picture == null || picture.Length == 0)
                {
                    await cache.RemoveAsync(key, cancellationToken);
                    return;
                }

                await cache.SetStringAsync(
                    key,
                    Convert.ToBase64String(picture),
                    new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(12)
                    },
                    cancellationToken);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[CACHE][WRITE][ERROR] Key={key}. {ex.Message}");
            }
        }
    }
}
