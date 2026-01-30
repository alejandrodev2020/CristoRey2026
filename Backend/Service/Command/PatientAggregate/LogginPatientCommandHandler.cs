using MediatR;
using Microsoft.IdentityModel.Tokens;
using Service.Middleware;
using Service.Models.Patient;
using Service.Query.PatientQuery;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Service.Command.PatientAggregate
{
    public class LogginPatientCommandHandler : IRequestHandler<LogginPatientCommand, PatientModel>
    {
        private readonly IPatientQueryRepository _repository;
        public LogginPatientCommandHandler(IPatientQueryRepository repository)
        {
            _repository = repository;
        }

        public Task<PatientModel> Handle(LogginPatientCommand request, CancellationToken cancellationToken)
        {
            var validateUser = _repository.GetCiValidate(request.Ci);

            if (validateUser != null)
            {
                var record = _repository.GetAuthPatientByCiAndPhone(request.Ci, request.Phone);
                if (record != null)
                {
                    if (record.File != null)
                    {
                        record.Photo = Convert.ToBase64String(record.File);
                    }

                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, record.Id.ToString()),
                        new Claim(ClaimTypes.Name, record.FirstName),
                    };

                    var tokenHandler = new JwtSecurityTokenHandler();

                    var key = Encoding.ASCII.GetBytes("EstaEsUnaClaveSecretaDe32Bytes!!");
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(claims),
                        Expires = DateTime.UtcNow.AddDays(10), // Configura el tiempo de expiración
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };


                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    record.Token = tokenHandler.WriteToken(token);

                    return Task.FromResult(record);
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
