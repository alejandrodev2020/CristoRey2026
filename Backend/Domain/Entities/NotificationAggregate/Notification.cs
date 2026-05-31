using Domain.Entities.AuthAggregate;
using Resources.Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.NotificationAggregate
{
    public class Notification : BaseModel, IAggregateRoot
    {
        public Notification(int targetUserId, int senderUserId, string title, string message,
                            string type, string actionUrl, int id = default) : this()
        {
            Id = id;
            TargetUserId = targetUserId;
            SenderUserId = senderUserId;
            Title = title;
            Message = message;
            Type = type;
            ActionUrl = actionUrl;
            IsRead = false;
            CreatedAt = DateTime.UtcNow;
        }

        internal Notification()
        {
        }

        /// <summary>
        /// Id de la notificación
        /// </summary>
        [Column("nNotificationId")]
        [Required]
        public override int Id { get; protected set; }

        /// <summary>
        /// ID del usuario que recibe la alerta (AuthUser)
        /// </summary>
        [Column("nTargetUserId")]
        [Required]
        public int TargetUserId { get; private set; }

        /// <summary>
        /// ID del usuario que provoca la acción (AuthUser)
        /// </summary>
        [Column("nSenderUserId")]
        [Required]
        public int SenderUserId { get; private set; }

        /// <summary>
        /// Título corto de la notificación
        /// </summary>
        [Column("sTitle")]
        [Required]
        public string Title { get; private set; }

        /// <summary>
        /// Cuerpo o mensaje detallado de la alerta
        /// </summary>
        [Column("sMessage")]
        [Required]
        public string Message { get; private set; }

        /// <summary>
        /// Tipo de notificación (ej: NEW_APPOINTMENT, APPOINTMENT_ACCEPTED)
        /// </summary>
        [Column("sType")]
        [Required]
        public string Type { get; private set; }

        /// <summary>
        /// URL o ruta de redirección en la app (opcional)
        /// </summary>
        [Column("sActionUrl")]
        public string ActionUrl { get; private set; }

        /// <summary>
        /// Estado de lectura
        /// </summary>
        [Column("bIsRead")]
        [Required]
        public bool IsRead { get; private set; }

        /// <summary>
        /// Fecha de creación en UTC
        /// </summary>
        [Column("dCreatedAt")]
        [Required]
        public DateTime CreatedAt { get; private set; }

        /// <summary>
        /// Fecha en la que el usuario leyó la notificación (opcional)
        /// </summary>
        [Column("dReadAt")]
        public DateTime? ReadAt { get; private set; }


        #region Métodos de Dominio (Comportamiento)

        /// <summary>
        /// Fábrica estática para crear una nueva notificación en estado inicial correcto
        /// </summary>
        public static Notification CreateNotification(int targetUserId, int senderUserId, string title,
                                                      string message, string type, string actionUrl)
        {
            return new Notification
            {
                TargetUserId = targetUserId,
                SenderUserId = senderUserId,
                Title = title,
                Message = message,
                Type = type,
                ActionUrl = actionUrl,
                IsRead = false,
                CreatedAt = DateTime.UtcNow,
                Status = true
            };
        }

        /// <summary>
        /// Marca la notificación como leída y estampa el tiempo exacto
        /// </summary>
        public void MarkAsRead()
        {
            if (!IsRead)
            {
                IsRead = true;
                ReadAt = DateTime.UtcNow;
            }
        }

        #endregion
    }
}