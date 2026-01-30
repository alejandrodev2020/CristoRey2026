using Data.Command.Contexts;
using Data.Command.Repository;
using Domain.Entities.AuthAggregate;
using Domain.Entities.DoctorAggregate;
using Domain.Entities.Options;
using Domain.Entities.PatientAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Data.Command
{
    public static class Service
    {
        public static void AddPersistenceInfraestructure(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<DbContexts>(options => options.UseNpgsql(connectionString));
            services.AddScoped<IAuthUserRepository, AuthUserRepository>();
            services.AddScoped<IDoctorRepository, DoctorRepository>();
            services.AddScoped<IOptionsRepository, OptionsRepository>();
            services.AddScoped<IPatientRepository, PatientRepository>();

                


        }
    }
}
