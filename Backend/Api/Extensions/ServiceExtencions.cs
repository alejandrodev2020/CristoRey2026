using Microsoft.AspNetCore.Mvc;
namespace Api.Extensions
{
    public static class ServiceExtencions
    {
        public static void AddApiVersioningExtencion(this IServiceCollection services)
        {
            services.AddApiVersioning(config =>
            {
                config.DefaultApiVersion = new ApiVersion(1, 0);
                config.AssumeDefaultVersionWhenUnspecified = true;  
                config.ReportApiVersions = true;    
            });
        }
    }
}
