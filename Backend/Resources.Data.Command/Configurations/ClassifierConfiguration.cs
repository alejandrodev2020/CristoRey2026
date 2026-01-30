using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Resources.Data.Command.Configurations
{
    /// <summary>
    /// Clase de configuración para las entidades clasificadoras
    /// </summary>
    /// <typeparam name="TEntity">El tipo de datos de una entidad que deriva de Rocket.Domain.Entities.BaseClassifier</typeparam>
	public class ClassifierConfiguration<TEntity> : IEntityTypeConfiguration<TEntity> where TEntity : Resources.Domain.Entities.BaseClassifier
    {
        /// <summary>
        /// Genera una nueva instancia del configurador con los valores dados por defecto
        /// </summary>
        /// <param name="keyName">Nombre de la columna de la llave primaria</param>
        /// <param name="seed">Listado de valores que con los cuales inicializar el clasificador</param>
        /// <param name="descLength">Longitud de la columna descripción</param>
        /// <param name="descName">Nombre de la columna descripción</param>
        /// <param name="statusName">Nombre de la columna de estado</param>
        public ClassifierConfiguration(TEntity[] seed = null, string keyName = null, int descLength = 50, string descName = "sDescription", string statusName = "bStatus", bool identityId = true)
        {

            KeyName = keyName ?? string.Format("n{0}Id", typeof(TEntity).Name);
            DescLength = descLength;
            DescName = descName;
            Seed = seed;
            StatusName = statusName;
            IdentityId = identityId;
        }

        /// <summary>
        /// Nombre de la columna de la llave primaria
        /// </summary>
        public string KeyName { get; private set; }

        /// <summary>
        /// Longitud de la columna descripción
        /// </summary>
        public int DescLength { get; private set; }

        /// <summary>
        /// Nombre de la columna descripción
        /// </summary>
        public string DescName { get; private set; }

        /// <summary>
        /// Listado de valores que con los cuales inicializar el clasificador
        /// </summary>
        public IList<TEntity> Seed { get; private set; }

        /// <summary>
        /// Nombre de la columna de estado
        /// </summary>
        public string StatusName { get; private set; }

        /// <summary>
        /// Indicador de que la columna Id debe ser autogenerada
        /// </summary>
        public bool IdentityId { get; private set; }

        /// <summary>
        /// Realiza la configuración del clasificador según los valores dados.
        /// </summary>
        /// <param name="builder"></param>
        public virtual void Configure(EntityTypeBuilder<TEntity> builder)
        {
            builder.Property(p => p.Id).HasColumnName(KeyName);
            builder.Property(p => p.Name).HasColumnName(DescName);
            builder.Property(p => p.Name).HasMaxLength(DescLength);
            builder.Property(p => p.Status).HasColumnName(StatusName);


            if (!IdentityId)
            {
                builder.Property(p => p.Id).ValueGeneratedNever();
            }

            if (Seed is not null)
            {
                foreach (TEntity item in Seed)
                {
                    builder.HasData(item);
                }
            }
        }
    }
}
