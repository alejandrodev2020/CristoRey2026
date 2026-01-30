using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Service.Command.AuthAggregate;
using Service.Middleware;
using Service.Models.AuthUser;
using Service.Query.AuthUserQuery;

namespace Api.Controllers
{
    [Produces("application/json")]
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IHubContext<ClienteHub> _hubContext;  // Inyectamos el contexto de SignalR

        public AuthController(IMediator mediator, IHubContext<ClienteHub> hubContext)
        {
            _mediator = mediator;
            _hubContext = hubContext;  // Inyectamos el contexto del Hub
        }

        /// <summary>
        /// Realiza una busqueda dado el Identificador.
        /// </summary>
        /// <param name="id">parametro para realizar la busqueda</param>
        /// <returns></returns>
        [HttpGet("user/{id}")]
        public async Task<ActionResult<AuthUserModel>> GetClientById(int id)
        {
            return await _mediator.Send(new GetAuthUserByIdQuery { Id = id });
        }


        /// <summary>
        /// Retorna ul listado de la entidad.
        /// </summary>
        /// <returns></returns>
        [HttpGet("user/list")]
        public async Task<ActionResult<IEnumerable<AuthUserModel>>> GetAllClient()
        {
            return Ok(await _mediator.Send(new GetListAuthUserQuery()));
        }

        /// <summary>
        /// Realiza un guardado de registro.
        /// </summary>
        /// <param name="command">modelo de datos a guardar</param>
        /// <returns></returns>
        [HttpPost("user")]
        public async Task<ActionResult<Unit>> CreateAuthUser(CreateAuthUserCommand command)
        {
            return await _mediator.Send(command);
        }

        /// <summary>
        /// Realiza una actualizacion de un registro dado el Identificador.
        /// </summary>
        /// <param name="id">Parametro identificador de la entidad</param>
        /// <param name="command">Modelo de datoa a actualizar</param>
        /// <returns></returns>
        [HttpPut("user/{id}")]
        public async Task<ActionResult<Unit>> UpdateAuthUser(int id, UpdateAuthUserCommand command)
        {
            command.setId(id);
            return await _mediator.Send(command);
        }

        /// <summary>
        /// Realiza una baja de un registro dado el Identificador.
        /// </summary>
        /// <param name="id">Parametro identificador de la entidad</param>
        /// <param name="command">Modelo de datoa a actualizar</param>
        /// <returns></returns>
        [HttpPut("user/{id}/low")]
        public async Task<ActionResult<Unit>> lowAuthUser(int id, LowAuthUserCommand command)
        {
            command.setId(id);
            return await _mediator.Send(command);
        }

        /// <summary>
        /// Realiza un guardado de registro.
        /// </summary>
        /// <param name="command">modelo de datos a guardar</param>
        /// <returns></returns>
        [HttpPost("user/loggin")]
        public async Task<ActionResult<AuthUserModel>> LogginAuthUser(LogginAuthUserCommand command)
        {
            try
            {
                var user = await _mediator.Send(command);
                return Ok(user);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (InvalidCredentialsException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor.", error = ex.Message });
            }
        }

        /// <summary>
        /// Retorna ul listado de la entidad.
        /// </summary>
        /// <returns></returns>
        [HttpGet("user/admin-list")]
        public async Task<ActionResult<IEnumerable<AuthUserModel>>> GetAllUserAdmin()
        {
            return Ok(await _mediator.Send(new GetListAuthUserAdminQuery()));
        }

        /// <summary>
        /// actualizacion de contraseña.
        /// </summary>
        /// <param name="id">Parametro identificador de la entidad</param>
        /// <param name="command">Modelo de datoa a actualizar</param>
        /// <returns></returns>
        [HttpPut("reset-password")]
        [Authorize(Policy = "AdminOrSeller")]
        public async Task<ActionResult<Unit>> UpdatePasswordResetPassword(UpdateResetPasswordCommand command)
        {
            return await _mediator.Send(command);
        }

        /// <summary>
        /// actualizacion de la configuracion
        /// </summary>
        /// <param name="id">Parametro identificador de la entidad</param>
        /// <param name="command">Modelo de datoa a actualizar</param>
        /// <returns></returns>
        [HttpPut("configuration")]
        [Authorize]
        public async Task<ActionResult<Unit>> UpdateConfigUser(UpdateAuthUserConfigCommand command)
        {
            return await _mediator.Send(command);
        }
    }
}
