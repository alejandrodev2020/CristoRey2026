using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Resources.Domain.Entities.Repository
{
    public interface IRepository<TEntity> where TEntity : IAggregateRoot
    {
        /// <summary>
        /// Objeto que implementa el patron de unidad de trabajo
        /// </summary>
        IUnitOfWork UnitOfWork { get; }

        /// <summary>
        /// Añade una entidad a la unidad de trajajo
        /// </summary>
        /// <param name="entity">Entidad a añadir</param>
        /// <returns>Retorna una referencia a la entidad ya añadida</returns>
        TEntity Add(TEntity entity);

        /// <summary>
        /// Actualiza una entidad a la unidad de trajajo
        /// </summary>
        /// <param name="entity">Entidad a añadir</param>
        /// <returns>Retorna una referencia a la entidad ya añadida</returns>
        TEntity Update(TEntity entity);

        /// <summary>
        /// Elimina una entidad a la unidad de trajajo
        /// </summary>
        /// <param name="entity">Entidad a añadir</param>
        /// <returns>Retorna una referencia a la entidad ya añadida</returns>
        void Delete(TEntity entity);
    }
}
