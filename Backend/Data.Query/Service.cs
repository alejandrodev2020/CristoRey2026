using Data.Query.Repository;
using Microsoft.Extensions.DependencyInjection;
using Resources.Data.Query.Repository;
using Service.Query.AuthUserQuery;
using Service.Query.DoctorQuery;
using Service.Query.OptionsQuery;
using Service.Query.PatientQuery;

namespace Data.Query
{
    public static class Service
    {
        public static void RegisterDataQuery(this IServiceCollection services, string connectionString)
        {
            services.AddScoped<IAuthUserQueryRepository>(x => new AuthUserQueryRepository(connectionString));
            services.AddScoped<IDoctorQueryRepository>(x => new DoctorQueryRepository(connectionString));
            services.AddScoped<IOptionsQueryRepository>(x => new OptionsQueryRepository(connectionString));
            services.AddScoped<IPatientQueryRepository>(x => new PatientQueryRepository(connectionString));




        }
    }
}
