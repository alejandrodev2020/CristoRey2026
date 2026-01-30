using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Resources.Domain.Entities.Repository
{
    public interface IUnitOfWork : IDisposable
    {
        /// <summary>
        /// Guarda los datos de todas las entidades traqueadas por la unidad de trabajo
        /// </summary>
        /// <param name="cancellationToken">Token de cancelación</param>
        /// <returns>Retorna Verdadero en caso de haber completado con éxito la operación</returns>
        Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default(CancellationToken));
    }
}
