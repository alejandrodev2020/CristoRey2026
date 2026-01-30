using Data.Command.Configurations;
using Domain.Entities.AuthAggregate;
using Domain.Entities.Classifiers;
using Domain.Entities.DoctorAggregate;
using Domain.Entities.Options;
using Domain.Entities.PatientAggregate;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure.Internal;
using Resources.Cache.Session;
using Resources.Data.Command;
using Resources.Data.Command.Configurations;

namespace Data.Command.Contexts
{

    public class DbContexts : BaseDbContext
    {
        public DbContexts()
        {
        }
        public DbContexts(ISession session, 
                          IMediator mediator, 
                          IConfiguration configuration) : base(session, mediator , configuration)
        {
        }

        public DbContexts(DbContextOptions<DbContexts> options, ISession session, IMediator mediator) : base(options, session, mediator)
        {
            var connectionString = options.Extensions.OfType<NpgsqlOptionsExtension>().FirstOrDefault()?.ConnectionString;
        }

        public override string Owner => "bf";
        public override string TablePrefix => "_test";

        /// <summary>
        /// Reemplazo del OnModelCreating, dado que se ha selleado dicho método. Todos los registrosd e entidades deberían hacerse aquí
        /// </summary>
        /// <param name="modelBuilder">Constructor de modelos</param>

        protected override void OnPreModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ClassifierConfiguration<AuthRole>(
            new AuthRole[]{
                                    new AuthRole(1, "Administrador", DateTime.UtcNow,1,true),
                                    new AuthRole(2, "Doctor", DateTime.UtcNow,1,true),
                                    new AuthRole(3, "Paciente", DateTime.UtcNow,1,true)
              })
            );

            modelBuilder.ApplyConfiguration(new ClassifierConfiguration<ClientZone>(
            new ClientZone[]{
                                    new ClientZone(1, "Santa Cruz", DateTime.UtcNow,1,true)
             })
            );

            modelBuilder.ApplyConfiguration(new Configurations.AuthUserConfiguration());
            modelBuilder.ApplyConfiguration(new AuthUserConfigurationConfiguration());
            modelBuilder.ApplyConfiguration(new DoctorConfiguration());
            modelBuilder.ApplyConfiguration(new OptionsDiasnosticConfiguration());
            modelBuilder.ApplyConfiguration(new OptionsTratamentConfiguration());
            modelBuilder.ApplyConfiguration(new ClinicalHistoryConfiguration());
            modelBuilder.ApplyConfiguration(new OptionsConfiguration());
            modelBuilder.ApplyConfiguration(new PatientConfiguration());


        }

        public DbSet<AuthUser> AuthUser { get; set; }
        public DbSet<Doctor> Doctor { get; set; }
        public DbSet<Options> Options { get; set; }
        public DbSet<Patient> Patient { get; set; }
        public DbSet<ClinicalHistory> ClinicalHistory { get; set; }


        #region




        #endregion
    }

}
