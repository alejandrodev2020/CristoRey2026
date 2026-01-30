using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Service.Models.IA;
using Service.Query.IAQuery;

namespace Api.Controllers
{
    [Produces("application/json")]
    [Route("api/ia")]
    [ApiController]
    public class IAController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IHubContext<ClienteHub> _hubContext;  // Inyectamos el contexto de SignalR

        public IAController(IMediator mediator, IHubContext<ClienteHub> hubContext)
        {
            _mediator = mediator;
            _hubContext = hubContext;  // Inyectamos el contexto del Hub
        }

        /// <summary>
        /// Retorna un listado de la entidad.
        /// </summary>
        /// <returns></returns>
        [HttpGet("promt")]
        public async Task<ActionResult<ResponseIAModel>> GetAllClient([FromQuery] PromtQuery model)
        {
            return Ok(await _mediator.Send(model));
        }

        /// <summary>
        /// Retorna un listado de la entidad.
        /// </summary>
        /// <returns></returns>
        [HttpGet("promt/actions")]
        public async Task<ActionResult<ResponseIAModel>> GeneratePromt([FromQuery] PromtActionsQuery model)
        {
            return Ok(await _mediator.Send(model));
        }


    }
}
