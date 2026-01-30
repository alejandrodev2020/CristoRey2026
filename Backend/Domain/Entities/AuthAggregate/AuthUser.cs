using Resources.Domain.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.AuthAggregate
{
    public class AuthUser : BaseModel, IAggregateRoot
    {
        public AuthUser(string firstname, string lastName, string phone, string ci, string nit,
                    byte[] avatar, string userName, string userKey, bool? isAdmin, int? authRoleId, bool? isActive, int id = default) : this()
        {
            Id = id;
            FirstName = firstname;
            LastName = lastName;
            Phone = phone;
            Ci = ci;
            Nit = nit;
            Avatar = avatar;
            UserName = userName;
            UserKey = userKey;
            IsAdmin = isAdmin;
            AuthRoleId = authRoleId;
            IsActive = isActive;

        }
        internal AuthUser()
        {
        }

        /// <summary>
        /// Id
        /// </summary>
        [Column("nAuthUserId")]
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
        /// Avatar
        /// </summary>
        [Column("fAvatar")]
        public byte[] Avatar { get; private set; }

        /// <summary>
        /// Nombre Usuario
        /// </summary>
        [Column("sUserName")]
        public string UserName { get; private set; }

        /// <summary>
        /// Clave de Usuario
        /// </summary>
        [Column("sUserKey")]
        public string UserKey { get; private set; }

        /// <summary>
        /// IsAdmin
        /// </summary>
        [Column("bIsAdmin")]
        public bool? IsAdmin { get; private set; }

        /// <summary>
        /// Id Rol
        /// </summary>
        [Column("nAuthRoleId")]
        public int? AuthRoleId { get; private set; }

        /// <summary>
        /// IsActive
        /// </summary>
        [Column("bIsActive")]
        public bool? IsActive { get; private set; }

        public AuthUserConfiguration AuthUserConfiguration { get; set; }

        #region
        public static AuthUser CreateUser(string firstname, string lastName, string phone, string ci, byte[] avatar, string userName, string userKey, bool? isAdmin, int? authRoleId) 
        {
            var record = new AuthUser();
            record.FirstName = firstname;
            record.LastName = lastName;
            record.Phone = phone;
            record.Ci = ci;
            record.Avatar = avatar;
            record.UserName = userName;
            record.UserKey = userKey;
            record.IsAdmin = isAdmin;
            record.AuthRoleId = authRoleId;
            record.IsActive = true;
            return record;
        }

        public void UpdateUser(string firstname, string lastName, string phone, string ci, string nit, byte[] avatar, string userName) 
        {
            FirstName = firstname;
            LastName = lastName;
            Phone = phone;
            Ci = ci;
            Nit = nit;
            Avatar = avatar;
            UserName = userName;
        }

        public void UpdatePasswordReset(string newpassword)
        {
            UserKey = newpassword;
        }

        public void LowAuthUser()
        {
            IsActive = false;
        }

        #endregion


    }
}