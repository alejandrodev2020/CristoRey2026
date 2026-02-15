using MediatR;
using Microsoft.IdentityModel.Tokens;
using Service.Middleware;
using Service.Models.AuthUser;
using Service.Query.AuthUserQuery;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Service.Command.AuthAggregate
{
    public class LogginAuthUserCommandHandler : IRequestHandler<LogginAuthUserCommand, AuthUserModel>
    {
        private readonly IAuthUserQueryRepository _repository;
        public LogginAuthUserCommandHandler(IAuthUserQueryRepository repository)
        {
            _repository = repository;
        }

        public async Task<AuthUserModel> Handle(LogginAuthUserCommand request, CancellationToken cancellationToken)
        {
            string cleanUserName = request.UserName?.Trim();
            string cleanUserKey = request.UserKey?.Trim();
            var validateUser = _repository.GetUserNameValidate(cleanUserName);

            if (validateUser != null)
            {
                var record = _repository.GetAuthUserByUserNameAndUserKey(cleanUserName, cleanUserKey);
                if (record != null)
                {
                    if (record.AvatarByte != null)
                    {
                        record.Avatar = Convert.ToBase64String(record.AvatarByte);
                    }


                    var role = _repository.GetRoleById(record.AuthRole.Id);

                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, record.Id.ToString()),
                        new Claim(ClaimTypes.Name, record.UserName),
                        new Claim(ClaimTypes.Role, role.Name) // Agrega el rol único
                    };

                    var tokenHandler = new JwtSecurityTokenHandler();
                    var claveLarga = "EstaClaveEsSuperSecretaYTieneMasDe32Caracteres2026!";
                    var key = Encoding.ASCII.GetBytes(claveLarga);

                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(claims),
                        Expires = DateTime.UtcNow.AddDays(10), // Configura el tiempo de expiración
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };


                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    record.Token = tokenHandler.WriteToken(token);

                    return record;
                }
                else 
                {
                   
                    throw new InvalidCredentialsException("Contraseña errónea");
                }
            }
            else
            {
                throw new NotFoundException("Usuario inexistente");
            }
        }
    }
}
