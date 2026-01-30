using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Resources.Domain.Events.Classifier
{
    /// <summary>
    /// Evento de dominio que se desencadena cuando un clasificador es creado
    /// </summary>
    /// <typeparam name="TClassifier">Tipo del clasificador</typeparam>
    public class ClassifierCreatedDomainEvent<TClassifier>: BaseEventDomain
    {
        /// <summary>
        /// Clasificador creado
        /// </summary>
        public readonly TClassifier classifier;

        /// <summary>
        /// Crea una nueva instancia del evento
        /// </summary>
        /// <param name="classifier">Clasificador Creado</param>
        public ClassifierCreatedDomainEvent(TClassifier classifier)
        {
            this.classifier = classifier;
        }
    }
}
