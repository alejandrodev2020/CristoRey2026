using Domain.Entities.AuthAggregate;
using MediatR;
using Microsoft.AspNetCore.Http;
using Service.Command.UtilsAggregate;
using System.Security.Claims;

namespace Service.Command.AuthAggregate
{
    public class CreateAuthUserDeviceCommandHandler : IRequestHandler<CreateAuthUserDeviceCommand, ResponseGenericCommand<Unit>>
    {
        private readonly IAuthUserRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CreateAuthUserDeviceCommandHandler(IAuthUserRepository repository,
                                                  IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ResponseGenericCommand<Unit>> Handle(CreateAuthUserDeviceCommand request, CancellationToken cancellationToken)
        {
            var response = new ResponseGenericCommand<Unit>();
            try
            {
                var userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                {
                    response.Message = "No se pudo identificar al usuario (Token inválido)";
                    response.HttpCode = "401";
                    return response;
                }

                if (string.IsNullOrEmpty(request.DeviceToken))
                {
                    response.Message = "El Token del dispositivo es obligatorio";
                    response.HttpCode = "400";
                    return response;
                }

                var user = await _repository.FindByIdAsync(userId);
                if (user == null)
                {
                    response.Message = "El usuario no existe en la base de datos";
                    response.HttpCode = "404";
                    return response;
                }

                user.RegisterDevice(
                    device: request.Device,
                    token: request.DeviceToken,
                    platform: request.Platform,
                    version: request.SystemVersion
                );

                _repository.Update(user);
                bool result = await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

                if (result)
                {
                    response.Message = "Dispositivo registrado exitosamente";
                    response.Code = "COD001";
                    response.HttpCode = "200";
                    response.Data = Unit.Value;
                }
                else
                {
                    response.Message = "No se pudieron guardar los cambios en la base de datos";
                    response.HttpCode = "500";
                }
            }
            catch (Exception ex)
            {
                response.Message = "Error interno al procesar el registro del dispositivo";
                response.Error = ex.Message;
                response.HttpCode = "500";
            }

            return response;

        }
    }
}
