using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Resources.Cache.Session;
using Resources.Domain.Entities;
using Resources.Domain.Entities.Repository;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Resources.Data.Command
{
    public abstract class BaseDbContext : DbContext, IUnitOfWork
    {
        /// <summary>
        /// Objeto mediadador para manejar eventos.
        /// </summary>
        protected readonly IMediator _mediator;
        /// <summary>
        /// Objeto con la info de sesión del usuario logueado.
        /// </summary>
        protected readonly ISession _session;
        /// <summary>
        /// Owner de la base de datos. Debe sobreescribirse en la clase base para devolver el owner deseado
        /// </summary>

        protected readonly IConfiguration _configuration;

        public abstract string Owner { get; }
        /// <summary>
        /// Prefijo a aplicar a todas las tablas. Debe sobreescribirse en la clase base para devolver el owner deseado
        /// </summary>
        public abstract string TablePrefix { get; }

        /// <summary>
        /// constructor sin parámetros.
        /// </summary>
        public BaseDbContext()
        {

        }

        /// <summary>
        /// Constructor para injección de dependencias
        /// </summary>
        /// <param name="session">Objeto con la info de sesión del usuario logueado</param>
        /// <param name="mediator">Objeto mediadador para manejar eventos.</param>
        public BaseDbContext(ISession session, IMediator mediator,  IConfiguration configuration)
        {
            _mediator = mediator;
            _session = session;
            _configuration = configuration;
        }

        /// <summary>
        /// Constructor para injección de dependencias
        /// </summary>
        /// <param name="options">Opciones de contexto</param>
        /// <param name="session">Objeto con la info de sesión del usuario logueado</param>
        /// <param name="mediator">Objeto mediadador para manejar eventos.</param>
        public BaseDbContext(DbContextOptions options, ISession session, IMediator mediator) : base(options)
        {
            _mediator = mediator;
            _session = session;
        }

        /// <summary>
        /// Saves all changes made in this context to the database.
        /// This method will automatically call Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.DetectChanges
        /// to discover any changes to entity instances before saving to the underlying database.
        /// This can be disabled via Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.AutoDetectChangesEnabled.
        /// </summary>
        /// <returns>el número de entidades escritas en base de datos</returns>
        public override int SaveChanges()
        {
            int ReturnValue;
            OnBeforeSaving();
            _mediator.DispatchDomainEventsPreSaveAsync(this).GetAwaiter().GetResult();
            ReturnValue = base.SaveChanges();
            _mediator.DispatchDomainEventsPostSaveAsync(this).GetAwaiter().GetResult();

            return ReturnValue;
        }

        /// <summary>
        /// Saves all changes made in this context to the database.
        /// This method will automatically call Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.DetectChanges
        /// to discover any changes to entity instances before saving to the underlying database.
        /// This can be disabled via Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.AutoDetectChangesEnabled.
        /// </summary>
        /// <param name="acceptAllChangesOnSuccess">Indicates whether Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.AcceptAllChanges is called after the changes have been sent successfully to the database.</param>
        /// <returns>el número de entidades escritas en base de datos</returns>
        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            int ReturnValue;
            OnBeforeSaving();
            _mediator.DispatchDomainEventsPreSaveAsync(this).GetAwaiter().GetResult();
            ReturnValue = base.SaveChanges(acceptAllChangesOnSuccess);
            _mediator.DispatchDomainEventsPostSaveAsync(this).GetAwaiter().GetResult();

            return ReturnValue;
        }

        /// <summary>
        /// Saves all changes made in this context to the database.
        /// This method will automatically call Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.DetectChanges
        /// to discover any changes to entity instances before saving to the underlying database.
        /// This can be disabled via Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.AutoDetectChangesEnabled.
        /// </summary>
        /// <param name="acceptAllChangesOnSuccess">Indicates whether Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.AcceptAllChanges is called after the changes have been sent successfully to the database.</param>
        /// <param name="cancellationToken">A System.Threading.CancellationToken to observe while waiting for the task to complete.</param>
        /// <returns>el número de entidades escritas en base de datos</returns>
        public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            int ReturnValue;

            OnBeforeSaving();
            await _mediator.DispatchDomainEventsPreSaveAsync(this);
            ReturnValue = (await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken));
            await _mediator.DispatchDomainEventsPostSaveAsync(this);

            return ReturnValue;
        }

        /// <summary>
        /// Saves all changes made in this context to the database.
        /// This method will automatically call Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.DetectChanges
        /// to discover any changes to entity instances before saving to the underlying database.
        /// This can be disabled via Microsoft.EntityFrameworkCore.ChangeTracking.ChangeTracker.AutoDetectChangesEnabled.
        /// </summary>
        /// <param name="cancellationToken">A System.Threading.CancellationToken to observe while waiting for the task to complete.</param>
        /// <returns>el número de entidades escritas en base de datos</returns>
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            int ReturnValue;

            OnBeforeSaving();
            await _mediator.DispatchDomainEventsPreSaveAsync(this);
            ReturnValue = (await base.SaveChangesAsync(cancellationToken));
            await _mediator.DispatchDomainEventsPostSaveAsync(this);

            return ReturnValue;
        }

        /// <summary>
        /// Método que se ejecuta antes de realizar el salvado de los cambios
        /// </summary>
        protected virtual void OnBeforeSaving()
        {
            var timeZoneId = "America/La_Paz";
            TimeZoneInfo boliviaTimeZone;

            try
            {
                boliviaTimeZone = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);
            }
            catch (TimeZoneNotFoundException)
            {
                throw new InvalidOperationException($"La zona horaria con ID '{timeZoneId}' no se encontró en el sistema.");
            }

            // Obtén la hora actual en UTC
            var nowUtc = DateTime.UtcNow;

            // Convertir la hora UTC a la zona horaria de Bolivia
            var boliviaTime = TimeZoneInfo.ConvertTimeFromUtc(nowUtc, boliviaTimeZone);

            var entries = ChangeTracker.Entries();

            foreach (var entry in entries)
            {
                if (entry.State != EntityState.Unchanged)
                {
                    if (entry.Entity is BaseMappedModel trackable)
                    {
                        if (_session != null && _session.HasUser())
                        {
                            trackable.UserCode = _session.GetUserCode();
                        }

                        // Asigna la hora en UTC en lugar de la hora en Bolivia
                        trackable.Create = nowUtc;
                        trackable.Computed = nowUtc;
                    }
                }
            }
        }



        /// <summary>
        /// Configura la base de datos a ser usada
        /// </summary>
        /// <param name="optionsBuilder">Builder de opciones</param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
           if (!optionsBuilder.IsConfigured)
            {
                //var connectionString = "Host=191.101.70.63;Port=5432;Database=MSCC020;Username=postgres;Password=jtgmad1wp;Pooling=true";
                var connectionString = "Host=191.101.70.63;Port=5432;Database=MSCC050;Username=postgres;Password=jtgmad1wp;Pooling=true";
                optionsBuilder.UseNpgsql(connectionString);
            }
        }

        /// <summary>
        /// Se ejecuta al crear el modelo. Configura el owner y añade el prefijo a las tablas. Está sellada
        /// </summary>
        protected override sealed void OnModelCreating(ModelBuilder modelBuilder)
        {
            OnPreModelCreating(modelBuilder);

            //if (Environment.GetEnvironmentVariable("DB_DRIVER") == "mssql")
            //{
            //    modelBuilder.HasDefaultSchema(Owner);
            //}

            base.OnModelCreating(modelBuilder);
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                entity.SetTableName(entity.GetTableName());
            }

            OnPostModelCreating(modelBuilder);

        }

        /// <summary>
        /// Reemplazo del OnModelCreating, dado que se ha selleado dicho método. Todos los registrosd e entidades deberían hacerse aquí
        /// </summary>
        /// <param name="modelBuilder">Constructor de modelos</param>
        protected abstract void OnPreModelCreating(ModelBuilder modelBuilder);

        /// <summary>
        /// En caso que se desee ejecutar algo justo despues de haber terminado el OnModelCreating, sobreescribir este método
        /// </summary>
        /// <param name="modelBuilder">Constructor de modelos</param>
        protected virtual void OnPostModelCreating(ModelBuilder modelBuilder)
        {

        }


        public async Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default)
        {
            // After executing this line all the changes (from the Command Handler and Domain Event Handlers) 
            // performed through the DbContext will be committed
            var result = await base.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
