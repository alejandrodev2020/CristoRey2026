using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Service.Notifications;
using System.Reflection;

namespace Service
{
    public static class Service
    {
        public static void AddApplicationLayer(this IServiceCollection services)
        {
            services.AddMediatR(Assembly.GetExecutingAssembly(), Assembly.Load("Service"));

            services.AddScoped<FirebaseNotificationService>();
        }

    }
}
