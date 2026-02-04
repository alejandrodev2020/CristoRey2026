using MediatR;
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

      
    }
}
