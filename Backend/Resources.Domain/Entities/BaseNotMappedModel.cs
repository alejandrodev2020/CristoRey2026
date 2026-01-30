using MediatR;
using Resources.Domain.Events;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Resources.Domain.Entities
{
    public abstract class BaseNotMappedModel
    {
        /// <summary>
        /// HashCode de la entidad
        /// </summary>
        int? _requestedHashCode;

        /// <summary>
        /// Propiedad que debe ser sobreescrita en las clases derivadas con la llave primaria, para poder implementar comportamiento genérido
        /// </summary>
        public abstract int Id { get; protected set; }

        /// <summary>
        /// Código del usuario responsable del registro
        /// </summary>
        [JsonIgnore]
        [Column("nUsercode")]
        public int UserCode { get; set; }

        /// <summary>
        /// Fecha de creacion de del registro
        /// </summary>
        [JsonIgnore]
        [Column("dCreate")]
        public DateTime Create { get; set; }

        /// <summary>
        /// Fecha de cómputo de del registro
        /// </summary>
        [JsonIgnore]
        [Column("dCompDate")]
        public DateTime Computed { get; set; }

        /// <summary>
        /// Listado de eventos de dominio pre-guardado
        /// </summary>        
        private List<INotification> _domainEventsPre;

        /// <summary>
        /// Listado de eventos de dominio pre-guardado
        /// </summary>
        //[JsonIgnore]
        public IReadOnlyCollection<INotification> DomainEventsPre => _domainEventsPre?.AsReadOnly();

        /// <summary>
        /// Listado de eventos de dominio post-guardado
        /// </summary>        
        private List<INotification> _domainEventsPost;

        /// <summary>
        /// Listado de eventos de dominio post-guardado
        /// </summary>
        [JsonIgnore]
        public IReadOnlyCollection<INotification> DomainEventsPost => _domainEventsPost?.AsReadOnly();

        /// <summary>
        /// Se encarga de añadir un evento de dominio que será propagado tanto antes como despues del guardado
        /// </summary>
        /// <typeparam name="T">Cualquier clase que represente un evento e implemente INotification</typeparam>
        /// <param name="Event">Evento a añadir</param>
        protected void AddDomainEvent<T>(T Event) where T : INotification
        {
            PreSaveEventDomain<T> preEvent;
            PostSaveEventDomain<T> postEvent;

            preEvent = new PreSaveEventDomain<T>(Event);
            postEvent = new PostSaveEventDomain<T>(Event);

            _domainEventsPost = _domainEventsPost ?? new List<INotification>();
            _domainEventsPre = _domainEventsPre ?? new List<INotification>();


            _domainEventsPost.Add(postEvent);
            _domainEventsPre.Add(preEvent);
        }

        /// <summary>
        /// Limpia los eventos de dominio
        /// </summary>
        /// <param name="type">Determina cuales eventos se van a limpiar</param>
        public void ClearDomainEvents(DomainEventType type)
        {

            if (type == DomainEventType.PreSave)
            {
                _domainEventsPre?.Clear();
            }
            else if (type == DomainEventType.PostSave)
            {
                _domainEventsPost?.Clear();
            }
            else
            {
                _domainEventsPre?.Clear();
                _domainEventsPost?.Clear();

            }

        }

        /// <summary>
        /// Determina si una entidad está ya asignada
        /// </summary>
        /// <returns></returns>
        public bool IsTransient()
        {
            return this.Computed == default || this.Id == default;
        }

        /// <summary>
        /// Determina si este objeto es igual a otro objeto pasado por parámetro
        /// </summary>
        /// <param name="obj">objeto con el cual probar la igualdad</param>
        /// <returns>Verdadero si el objeto es igual al objeto actual</returns>
        public override bool Equals(object obj)
        {
            if (obj == null || !(obj is BaseNotMappedModel))
                return false;

            if (Object.ReferenceEquals(this, obj))
                return true;

            if (this.GetType() != obj.GetType())
                return false;

            BaseNotMappedModel item = (BaseNotMappedModel)obj;

            if (item.IsTransient() || this.IsTransient())
                return false;
            else
                return item.Id == this.Id;
        }

        /// <summary>
        /// Obtiene el Código hash
        /// </summary>
        /// <returns>Código hash del objeto</returns>
        public override int GetHashCode()
        {
            if (!IsTransient())
            {
                if (!_requestedHashCode.HasValue)
                    _requestedHashCode = this.Id.GetHashCode() ^ 31; // XOR for random distribution (http://blogs.msdn.com/b/ericlippert/archive/2011/02/28/guidelines-and-rules-for-gethashcode.aspx)

                return _requestedHashCode.Value;
            }
            else
                return base.GetHashCode();

        }

        /// <summary>
        /// Sobrecarga del operador igual
        /// </summary>
        /// <param name="left">Entidad de la parte izquierda del operador</param>
        /// <param name="right">Entidad de la parte derecha del operador</param>
        /// <returns>Veradero si ambos parámetros son iguales</returns>
        public static bool operator ==(BaseNotMappedModel left, BaseNotMappedModel right)
        {
            if (Object.Equals(left, null))
                return (Object.Equals(right, null)) ? true : false;
            else
                return left.Equals(right);
        }

        /// <summary>
        /// Sobrecarga del operador diferente
        /// </summary>
        /// <param name="left">Entidad de la parte izquierda del operador</param>
        /// <param name="right">Entidad de la parte derecha del operador</param>
        /// <returns>Veradero si ambos parámetros son diferentes</returns>
        public static bool operator !=(BaseNotMappedModel left, BaseNotMappedModel right)
        {
            return !(left == right);
        }

        /// <summary>
        /// Determina los tipos de eventos sobre los que se aplicará una operación
        /// </summary>
        public enum DomainEventType
        {
            /// <summary>
            /// Se refiere a todos los eventos, tanto de pre-guardado como de postguardado
            /// </summary>
            All,
            /// <summary>
            /// Se refiere a los eventos de pre-guardado
            /// </summary>
            PreSave,
            /// <summary>
            /// Se refiere a los eventos de post-guardado
            /// </summary>
            PostSave
        }
    }
}
