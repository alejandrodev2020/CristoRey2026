using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Service.Command.NotificationAggregate;

namespace Api.Controllers
{
    [Produces("application/json")]
    [Route("api/notification")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IHubContext<ClienteHub> _hubContext;  // Inyectamos el contexto de SignalR

        public NotificationController(IMediator mediator, IHubContext<ClienteHub> hubContext)
        {
            _mediator = mediator;
            _hubContext = hubContext;  // Inyectamos el contexto del Hub
        }

        /// <summary>
        /// Realiza Envio de Notificacion.
        /// </summary>
        /// <param name="command">modelo de datos a guardar</param>
        /// <returns></returns>
        [HttpPost("send-test")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<Unit>> CreateClient(SendTestNotificationCommand command)
        {
            return await _mediator.Send(command);
        }

        /// <summary>
        /// Valida si el dispositivo ya tiene registrado su token para el usuario.
        /// </summary>
        /// <param name="command">Token del dispositivo</param>
        /// <returns>true si el dispositivo está habilitado</returns>
        [HttpPost("validate-token-device")]
        [Authorize]
        public async Task<ActionResult<bool>> ValidateToken(ValidateTokenDeviceCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }




    }
}
