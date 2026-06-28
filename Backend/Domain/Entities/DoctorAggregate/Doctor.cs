using Domain.Entities.AuthAggregate;
using Resources.Domain.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.DoctorAggregate
{
    public class Doctor : BaseModel, IAggregateRoot
    {
        public Doctor( string firstname, string lastName, string phone, string ci, string nit,
                        byte[] photo, string ubication, string specialty, int? clientZoneId, bool? hasPhoto, bool? isActive, int id = default) : this()
        {
            Id = id;
            FirstName = firstname;
            LastName = lastName;
            Phone = phone;
            Ci = ci;
            Nit = nit;
            Photo = photo;
            Ubication = ubication;
            Specialty = specialty;
            ClientZoneId = clientZoneId;
            HasPhoto = hasPhoto;
            IsActive = isActive;

        }

        public Doctor(string firstname, string lastName, string phone, string ci, string nit,
              byte[] photo, string ubication, string specialty, int? clientZoneId, bool? hasPhoto,
              bool? isActive, double? latitude = null, double? longitude = null, string reference = null,
              string link = null, int id = default) : this()
        {
            Id = id;
            FirstName = firstname;
            LastName = lastName;
            Phone = phone;
            Ci = ci;
            Nit = nit;
            Photo = photo;
            Ubication = ubication;
            Specialty = specialty;
            ClientZoneId = clientZoneId;
            HasPhoto = hasPhoto;
            IsActive = isActive;
            Latitude = latitude;
            Longitude = longitude;
            Reference = reference;
            Link = link;
        }

        internal Doctor()
        {
        }

        /// <summary>
        /// Id
        /// </summary>
        [Column("nDoctorId")]
        [Required]
        public override int Id { get; protected set; }

        /// <summary>
        /// Nombres
        /// </summary>
        [Column("sFirstName")]
        [Required]
        public string FirstName { get; private set; }

        /// <summary>
        /// Apellidos
        /// </summary>
        [Column("sLastName")]
        public string LastName { get; private set; }

        /// <summary>
        /// Celular
        /// </summary>
        [Column("sPhone")]
        public string Phone { get; private set; }

        /// <summary>
        /// Numero documento 
        /// </summary>
        [Column("sCi")]
        public string Ci { get; private set; }

        /// <summary>
        /// Numero nit
        /// </summary>
        [Column("sNit")]
        public string Nit { get; private set; }


        /// <summary>
        /// Foto
        /// </summary>
        [Column("sPhoto")]
        public byte[] Photo { get; private set; }

        /// <summary>
        /// Ubicación
        /// </summary>
        [Column("sUbication")]
        public string Ubication { get; private set; }

        /// <summary>
        /// Compañia
        /// </summary>
        [Column("sSpecialty")]
        public string Specialty { get; private set; }

        /// <summary>
        /// Identificador de la Zona
        /// </summary>
        [Column("nClientZoneId")]
        public int? ClientZoneId { get; private set; }

        /// <summary>
        /// Existe Photo
        /// </summary>
        [Column("bHasPhoto")]
        public bool? HasPhoto { get; private set; }


        /// <summary>
        /// Latitud
        /// </summary>
        [Column("nLatitude")]
        public double? Latitude { get; private set; }

        /// <summary>
        /// Longitud
        /// </summary>
        [Column("nLongitude")]
        public double? Longitude { get; private set; }

        /// <summary>
        /// Referencia (opcional)
        /// </summary>
        [Column("sReference")]
        public string Reference { get; private set; }

        /// <summary>
        /// Link (opcional)
        /// </summary>
        [Column("sLink")]
        public string Link { get; private set; }

        /// <summary>
        /// IsActive
        /// </summary>
        [Column("bIsEmergency")]
        public bool? IsEmergency { get; private set; }

        /// <summary>
        /// IsActive
        /// </summary>
        [Column("bIsActive")]
        public bool? IsActive { get; private set; }

        /// <summary>
        /// Usuario del sistema (1 a 1)
        /// </summary>
        [Column("nAuthUserId")]
        public int AuthUserId { get; private set; }

        public AuthUser AuthUser { get; private set; }



        #region
        public static Doctor CreateDoctor(string firstname, string lastName, string phone, string ci, string nit, byte[] file,
                                          bool? hasPhoto, int? clientZoneId, string ubication,
                                          double? latitude , double?  longitude, string link, string specialty,
                                           bool? isEmergency)
        {
            var record = new Doctor();
            record.FirstName = firstname;
            record.LastName = lastName;
            record.Phone = phone;
            record.Ci = ci;
            record.Nit = nit;
            record.Photo = file;
            record.HasPhoto = hasPhoto;
            record.Ubication = ubication;
            record.ClientZoneId = clientZoneId;
            record.Specialty = specialty;
            record.Latitude = latitude;
            record.Longitude = longitude;
            record.Link = link; 
            record.IsActive = true;
            record.IsEmergency = isEmergency;

            return record;
        }
        public void setAUthUser(AuthUser user) 
        {
            AuthUser = user;    
        }

        public void UpdateDoctor(
            string firstname,
            string lastName,
            string phone,
            string ci,
            string nit,
            byte[] photo,
            string specialty,
            string ubication,
            double latitude,
            double longitude,
            string link,
            bool? isEmergency = true
        )
        {
            FirstName = firstname;
            LastName = lastName;
            Phone = phone;
            Ci = ci;
            Nit = nit;
            Photo = photo;
            Specialty = specialty;
            Ubication = ubication;
            Latitude = latitude;
            Longitude = longitude;
            Link = link;
            IsEmergency = isEmergency;
            IsActive = true;
        }
        public void LowDoctor()
        {
            IsActive = false;
        }
        public void ActiveDoctor()
        {
            IsActive = true;
        }

        #endregion


    }
}