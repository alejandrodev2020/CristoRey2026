using MediatR;
using Microsoft.IdentityModel.Tokens;
using Service.Middleware;
using Service.Models.Doctor;
using Service.Query.DoctorQuery;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Command.DoctorAggregate
{
    public class LogginDoctorCommandHandler : IRequestHandler<LogginDoctorCommand, DoctorModel>
    {
        private readonly IDoctorQueryRepository _repository;
        public LogginDoctorCommandHandler(IDoctorQueryRepository repository)
        {
            _repository = repository;
        }

        public async Task<DoctorModel> Handle(LogginDoctorCommand request, CancellationToken cancellationToken)
        {
            var validateUser = _repository.GetUserNameValidate(request.Ci);

            if (validateUser != null)
            {
                var record = _repository.GetAuthUserByCiAndPhone(request.Ci, request.Phone);
                if (record != null)
                {
                    //var configuration = await _mediator.Send(new GetConfigurationQuery());
                    //record.Configuration = configuration;
                    if (record.PhotoByte != null)
                    {
                        record.Photo = Convert.ToBase64String(record.PhotoByte);
                    }



                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, record.Id.ToString()),
                        new Claim(ClaimTypes.Name, record.FirstName),
                        new Claim(ClaimTypes.Role, "Doctor") // Agrega el rol único
                    };

                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes("EstaEsUnaClaveSecretaDe32Bytes!!");
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(claims),
                        Expires = DateTime.UtcNow.AddDays(10), // Configura el tiempo de expiración
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };


                    //var token = tokenHandler.CreateToken(tokenDescriptor);
                    //record.Token = tokenHandler.WriteToken(token);

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
