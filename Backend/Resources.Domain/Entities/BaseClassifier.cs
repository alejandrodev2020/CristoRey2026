using Resources.Domain.Events;
using Resources.Domain.Events.Classifier;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Resources.Domain.Entities
{
    /// <summary>
    /// Clase base para clasificadores
    /// </summary>
    public class BaseClassifier : BaseMappedModel, IBaseClassifier
    {
        /// <summary>
        /// Constructor por defecto
        /// </summary>
        /// <param name="id">Identificador del clasificador</param>
        /// <param name="name">Nombre del clasificador</param>
        /// <param name="computed">Fecha de cómputo de del registro</param>
        /// <param name="userCode">Código del usuario responsable del registro</param>
        /// <param name="status">Estado del registro</param>
        public BaseClassifier(int id, string name, DateTime computed, int userCode = 1, bool status = true)
        {
            Id = id;
            Name = name;
            Status = status;
            Computed = computed;
            UserCode = userCode;
        }

        protected BaseClassifier(string name, bool status, List<IBaseClassifier> list)
        {
            updEventAdded = true;
            Update(name, status, list, default);
        }

        /// <summary>
        /// Almacena el valor que indica que si ya se agregó
        /// </summary>
        private bool updEventAdded = false;

        /// <summary>
        /// Crea un nuevo clasificador del tipo dados
        /// </summary>
        /// <typeparam name="TClassiffier"></typeparam>
        /// <param name="name"></param>
        /// <param name="list"></param>
        /// <returns></returns>
        public static TClassiffier Create<TClassiffier>(string name, bool status, List<IBaseClassifier> list) where TClassiffier : BaseClassifier, IAggregateRoot
        {
            try
            {
                var returnValue = (TClassiffier)typeof(TClassiffier).GetMethod("Create").Invoke(null, new object[] { name, status, list });
                returnValue.AddDomainEvent(new ClassifierCreatedDomainEvent<TClassiffier>(returnValue));

                return returnValue;
            }
            catch (System.Reflection.TargetInvocationException ex)
            {
                if (ex.InnerException is not null)
                {
                    throw ex.InnerException;
                }
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Valida que no exista otro clasificador con el mismo nombre
        /// </summary>
        /// <typeparam name="TClassiffier"></typeparam>
        /// <param name="list"></param>
        private void ValidateExistName(List<IBaseClassifier> list, int? id)
        {
            // TODO: Verificar que el ID no sea igual al ID de la instanca (this.id)
            if (id.GetValueOrDefault() > 0)
            {
                list = list.Where(r => r.Id != id).ToList();
            }
            if (list.Count > 0)
            {
                throw new InvalidOperationException("No se puede añadir dos veces el mismo nombre");
            }

        }

        /// <summary>
        /// Identificador del clasificador
        /// </summary>
        public override int Id { get; protected set; }

        /// <summary>
        /// Nombre del clasificador
        /// </summary>
        public string Name { get; protected set; }

        /// <summary>
        /// Estado del registro
        /// </summary>
        public bool Status { get; protected set; }

        /// <summary>
        /// Actualiza los valores de un clasificador
        /// </summary>
        /// <typeparam name="TClassiffier">Tipo de clasificador</typeparam>
        /// <param name="name">Nombre a modificar</param>
        /// <param name="status">Estado a modificar</param>
        /// <param name="list">Listado que contiene los clasificadores del mismo tipo con el mismo nombre</param>
        public void Update(string name, bool status, List<IBaseClassifier> list, int? id)
        {
            UpdateName(name, list, id);
            UpdateStatus(status);
        }

        /// <summary>
        /// Actualiza el nombre de un clasificador
        /// </summary>
        /// <typeparam name="TClassiffier">Tipo de clasificador</typeparam>
        /// <param name="name">Nombre a modificar</param>
        /// <param name="list">Listado que contiene los clasificadores del mismo tipo con el mismo nombre</param>
        protected void UpdateName(string name, List<IBaseClassifier> list, int? id)
        {
            if (name != Name)
            {
                Name = name;
                ValidateExistName(list, id);
            }
            AddUpdatedDomainEvent();
        }

        /// <summary>
        /// Actualiza el estado de un clasificador
        /// </summary>
        /// <typeparam name="TClassiffier">Tipo de clasificador</typeparam>
        /// <param name="status">Estado a modificar</param>
        protected void UpdateStatus(bool status)
        {
            Status = status;
            AddUpdatedDomainEvent();
        }

        /// <summary>
        /// Realiza las acciones necesarias para eliminar un clasificador
        /// </summary>
        public static void Delete<TClassiffier>(TClassiffier instance) where TClassiffier : BaseClassifier
        {
            instance.AddDomainEvent(new ClassifierDeletedDomainEvent<TClassiffier>(instance));
        }

        /// <summary>
        /// Añade un evento de dominio para cuando el clasificador es actualizado
        /// </summary>
        private void AddUpdatedDomainEvent()
        {
            if (!updEventAdded)
            {
                updEventAdded = true;
                Type instanceType = this.GetType();
                var domainEvent = Activator.CreateInstance((typeof(ClassifierUpdatedDomainEvent<>).MakeGenericType(instanceType)), new object[] { this });
                var method = typeof(BaseClassifier).GetMethod(nameof(BaseClassifier.AddDomainEvent), System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);
                var generic = method.MakeGenericMethod(domainEvent.GetType());
                generic.Invoke(this, new object[] { domainEvent });
            }
        }
    }
}
