using Microsoft.EntityFrameworkCore;
using Resources.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Resources.Data.Command.Repository
{   /// <summary>
    /// Clase base para los repositorios de comandos
    /// </summary>
    /// <typeparam name="TEntity">Entidad Root del agregado</typeparam>
    /// <typeparam name="TContext">Contexto de la base de datos</typeparam>
    public abstract class BaseRepository<TEntity, TContext>
        where TEntity : BaseNotMappedModel, IAggregateRoot
        where TContext : BaseDbContext
    {
        /// <summary>
        /// Constructor de la clase base
        /// </summary>
        /// <param name="context">Contexto de base de datos</param>
        protected BaseRepository(TContext context)
        {
            _context = context;
            _dataSet = _context.Set<TEntity>();
        }

        /// <summary>
        /// Contexto de la base de datos
        /// </summary>
        protected readonly TContext _context;

        /// <summary>
        /// Dataset de la entidad root del repositorio
        /// </summary>
        protected readonly DbSet<TEntity> _dataSet;

        /// <summary>
        /// DataSet de la entidad
        /// </summary>
        protected virtual DbSet<TEntity> DataSet { get => _dataSet; }


        /// <summary>
        /// Añade una entidad a la unidad de trabajo. Se usa para entidades nuevas que no están siendo mapeadas
        /// </summary>
        /// <param name="item">Item a añadir</param>
        /// <returns>Retorna la entidad añadida</returns>
        protected TEntity AddAux(TEntity item)
        {
            if (item.IsTransient())
            {
                return DataSet
                    .Add(item)
                    .Entity;
            }
            else
            {
                return item;
            }
        }

        /// <summary>
        /// Actualiza una entidad a la unidad de trabajo. Se usa para entidades que ya están siendo mapeadas
        /// </summary>
        /// <param name="item">Item a actualizar</param>
        /// <returns>Retorna la entidad añadida</returns>
        protected TEntity UpdateAux(TEntity item)
        {
            var retVal = DataSet.Local.SingleOrDefault(i => i == item);

            if (retVal == default)
            {
                retVal = DataSet
                        .Update(item)
                        .Entity;
            }
            return retVal;
        }

        /// <summary>
        /// Elimina una entidad a la unidad de trabajo. Se usa para entidades que ya están siendo mapeadas
        /// </summary>
        /// <param name="item">Item a actualizar</param>
        /// <returns>Retorna la entidad añadida</returns>
        protected TEntity DeleteAux(TEntity item)
        {
            return DataSet
                    .Remove(item)
                    .Entity;
        }

        /// <summary>
        /// Actualiza varias entidades a la unidad de trabajo. Se usa para entidades que ya están siendo mapeadas
        /// </summary>
        /// <param name="item">Item a actualizar</param>
        /// <returns>Retorna la entidad añadida</returns>
        protected void UpdateRangeAux(IEnumerable<TEntity> items)
        {
            DataSet.UpdateRange(items);
        }
    }
}
