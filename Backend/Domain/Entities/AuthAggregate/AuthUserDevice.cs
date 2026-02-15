using Resources.Domain.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.AuthAggregate
{
    public class AuthUserDevice : BaseModel, IAggregateChild<AuthUser>
    {
        internal AuthUserDevice( string device, string deviceToken, string platform,
                                 string systemVersion, bool? isActive,
                                 int authUserId = default, int id = default) : this()
        {
            Id = id;
            AuthUserId = authUserId;
            Device = device;
            DeviceToken = deviceToken;
            Platform = platform;
            SystemVersion = systemVersion;
            IsActive = isActive ?? true;
            RegistrationDate = DateTime.UtcNow; // Se asigna al crear el registro
            LastLogin = DateTime.UtcNow;
        }

        internal AuthUserDevice()
        {
        }

        /// <summary>
        /// Id
        /// </summary>
        [Column("nAuthUserDeviceId")]
        [Required]
        public override int Id { get; protected set; }

        /// <summary>
        /// Nombre
        /// </summary>
        [Column("nAuthUserId")]
        [Required]
        public int AuthUserId { get; private set; }


        /// <summary>
        /// Nombre o modelo del dispositivo (ej: iPhone 13, Samsung S22)
        /// </summary>
        [Column("sDevice")]
        [Required]
        [MaxLength(200)]
        public string Device { get; private set; }

        /// <summary>
        /// El Token de Firebase (FCM Token) para enviar notificaciones
        /// </summary>
        [Column("sDeviceToken")]
        [Required]
        public string DeviceToken { get; private set; }

        /// <summary>
        /// Sistema operativo (Android, iOS, Web)
        /// </summary>
        [Column("sPlatform")]
        [MaxLength(50)]
        public string Platform { get; private set; }

        /// <summary>
        /// Versión del sistema operativo
        /// </summary>
        [Column("sSystemVersion")]
        [MaxLength(50)]
        public string SystemVersion { get; private set; }

        /// <summary>
        /// Fecha en la que se vinculó el dispositivo
        /// </summary>
        [Column("dRegistrationDate")]
        public DateTime RegistrationDate { get; private set; }

        /// <summary>
        /// Fecha de la última vez que se usó la app en este dispositivo
        /// </summary>
        [Column("dLastLogin")]
        public DateTime? LastLogin { get; private set; }

        /// <summary>
        /// IsActive
        /// </summary>
        [Column("bIsActive")]
        public bool? IsActive { get; private set; }


    }
}