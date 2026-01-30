using Domain.Entities.AuthAggregate;
using Resources.Domain.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.PatientAggregate
{
    public class Patient : BaseModel, IAggregateRoot
    {
        public Patient(string firstname, string lastName, string phone, string ci, string nit,
                        byte[] photo, string ubication, string company, int? patientZoneId, bool? hasPhoto, bool? isActive, int id = default) : this()
        {
            Id = id;
            FirstName = firstname;
            LastName = lastName;
            Phone = phone;
            Ci = ci;
            Nit = nit;
            Photo = photo;
            Ubication = ubication;
            Company = company;
            PatientZoneId = patientZoneId;
            HasPhoto = hasPhoto;
            IsActive = isActive;

        }

        public Patient(string firstname, string lastName, string phone, string ci, string nit,
              byte[] photo, string ubication, string company, int? patientZoneId, bool? hasPhoto,
              bool? isActive, double? latitude = null, double? longitude = null, string reference = null,
              string link = null, string codeVerified = null, bool? isVerified = null, int id = default) : this()
        {
            Id = id;
            FirstName = firstname;
            LastName = lastName;
            Phone = phone;
            Ci = ci;
            Nit = nit;
            Photo = photo;
            Ubication = ubication;
            Company = company;
            PatientZoneId = patientZoneId;
            HasPhoto = hasPhoto;
            IsActive = isActive;
            Latitude = latitude;
            Longitude = longitude;
            Reference = reference;
            Link = link;
            CodeVerified = codeVerified;
            IsVerified = isVerified;
        }

        internal Patient()
        {
            _clinicalHistorys = new List<ClinicalHistory>();
        }

        /// <summary>
        /// Id
        /// </summary>
        [Column("nPatientId")]
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
        [Column("sCompany")]
        public string Company { get; private set; }

        /// <summary>
        /// Identificador de la Zona
        /// </summary>
        [Column("nPatientZoneId")]
        public int? PatientZoneId { get; private set; }

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
        /// Codigo de verificacion (opcional)
        /// </summary>
        [Column("sCodeVerified")]
        public string CodeVerified { get; private set; }

        /// <summary>
        /// IsActive
        /// </summary>
        [Column("bIsVerified")]
        public bool? IsVerified { get; private set; }


        /// <summary>
        /// Id del Departamento
        /// </summary>
        [Column("nDepartamentId")]
        public int? DepartamentId { get; private set; }

        /// <summary>
        /// Id de la citudad
        /// </summary>
        [Column("nCityId")]
        public int? CityId { get; private set; }

        /// <summary>
        /// Id del Genero
        /// </summary>
        [Column("nGenderId")]
        public int? GenderId { get; private set; }

        /// <summary>
        /// Id del Genero
        /// </summary>
        [Column("nDoctorId")]
        public int? DoctorId { get; private set; }

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

        /// <summary>
        /// Listado de  historial clinico
        /// </summary>
        private List<ClinicalHistory> _clinicalHistorys;

        /// <summary>
        /// Listado de historial clinico
        /// </summary>
        public IReadOnlyList<ClinicalHistory> ClinicalHistorys => _clinicalHistorys;

        #region
       
        public static Patient CreatePatient(string firstname, string lastName, string phone, string ci, string nit,
                                  byte[] file, bool? hasPhoto, int? departamentId, int? cityId, int? genderId, int? doctorId)
        {
            var record = new Patient();
            record.FirstName = firstname;
            record.LastName = lastName;
            record.Phone = phone;
            record.Ci = ci;
            record.Nit = nit;
            record.Photo = file;
            record.HasPhoto = hasPhoto;
            record.DepartamentId = departamentId;
            record.CityId = cityId;
            record.PatientZoneId = 1;
            record.IsActive = true;
            record.GenderId = genderId;
            record.DoctorId = doctorId;
            return record;
        }

        public void setAUthUser(AuthUser user)
        {
            AuthUser = user;
        }

        public void UpdatePatient(string firstname, string lastName, string phone, string ci, string nit, byte[] file,
                                  bool? hasPhoto, int? departamentId, int? cityId, int? genderId,
                                  int? patientZoneId, string ubication, string company,
                                  double? latitude, double? longitude, string reference, string link)
        {
            FirstName = firstname;
            LastName = lastName;
            Phone = phone;
            Ci = ci;
            Nit = nit;
            Photo = file;
            HasPhoto = hasPhoto;
            DepartamentId = departamentId;
            CityId = cityId;
            GenderId = genderId;
            PatientZoneId = patientZoneId;
            Ubication = ubication;
            Company = company;
            Latitude = latitude;
            Longitude = longitude;
            Reference = reference;
            Link = link;
            IsActive = true;
        }

        public void LowPatient()
        {
            IsActive = false;
        }

        public void CreateClinicHistory(int doctorId, DateTime dateQuery, string motive, string diagnostic, 
                                        string observations, decimal? totalCost, bool? wasPaid)
        {
            var record = new ClinicalHistory(

                dateQuery: dateQuery,
                motive:motive,
                diagnostic: diagnostic,
                observations: observations,
                totalCost:totalCost,
                doctorId: doctorId,
                statusId: 1,
                wasPaid:wasPaid,
                isActive:true);
            _clinicalHistorys.Add(record);
            
        }



        #endregion


    }
}