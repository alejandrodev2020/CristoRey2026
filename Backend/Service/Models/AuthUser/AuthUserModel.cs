using Service.Models.Classifier;
using Service.Models.Configuration;
using System.Text.Json.Serialization;

namespace Service.Models.AuthUser
{
    public class AuthUserModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Ci { get; set; }
        public string Avatar { get; set; }
        [JsonIgnore]
        public byte[] AvatarByte { get; set; }
        public string UserName { get; set; }
        public string UserKey { get; set; }
        public bool IsAdmin { get; set; }
        public int? AuthUserId { get; set; }
        public string Token { get; set; }
        public bool IsActive { get; set; }
        public AuthUserConfigurationModel AuthUserConfiguration { get; set; }
        public BaseClassifierModel AuthRole { get; set; }
        public ConfigurationModel Configuration { get; set; }
    }
}
