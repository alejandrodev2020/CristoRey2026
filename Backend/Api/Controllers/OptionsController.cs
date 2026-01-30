using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Service.Command.OptionsAggregate;
using Service.Models.Options;
using Service.Query.OptionsQuery;

namespace Api.Controllers
{
    [Produces("application/json")]
    [Route("api/options")]
    [ApiController]
    public class OptionsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IHubContext<ClienteHub> _hubContext;  // Inyectamos el contexto de SignalR

        public OptionsController(IMediator mediator, IHubContext<ClienteHub> hubContext)
        {
            _mediator = mediator;
            _hubContext = hubContext;  // Inyectamos el contexto del Hub
        }

        /// <summary>
        /// Realiza un guardado de registro.
        /// </summary>
        /// <param name="command">modelo de datos a guardar</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Unit>> Post(CreateOptionsCommand command)
        {
            return await _mediator.Send(command);
        }

        /// <summary>
        /// Retorna ul listado de la entidad.
        /// </summary>
        /// <returns></returns>
        [HttpGet("list")]
        public async Task<ActionResult<IEnumerable<OptionsModel>>> GetAllProduct([FromQuery] GetListOptionsQuery model)
        {
            return Ok(await _mediator.Send(model));
        }

        /// <summary>
        /// Realiza una busqueda dado el Identificador.
        /// </summary>
        /// <param name="id">parametro para realizar la busqueda</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<OptionsModel>> GetCategoryById(int id)
        {
            return await _mediator.Send(new GetOptionsByIdQuery { Id = id });
        }

        /// <summary>
        /// Realiza una actualizacion de un registro dado el Identificador.
        /// </summary>
        /// <param name="id">Parametro identificador de la entidad</param>
        /// <param name="command">Modelo de datoa a actualizar</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> UpdateInitial(int id, UpdateOptionsCommand command)
        {
            command.setId(id);
            return await _mediator.Send(command);
        }

        /// <summary>
        /// Realiza una actualizacion de un registro dado el Identificador.
        /// </summary>
        /// <param name="id">Parametro identificador de la entidad</param>
        /// <param name="command">Modelo de datoa a actualizar</param>
        /// <returns></returns>
        [HttpPut("{id}/diasnostic")]
        public async Task<ActionResult<Unit>> createNewDiasnostic(int id, CreateDiasnosticCommand command)
        {
            command.setOptionId(id);
            return await _mediator.Send(command);
        }

        /// <summary>
        /// Realiza una actualizacion de un registro dado el Identificador.
        /// </summary>
        /// <param name="id">Parametro identificador de la entidad</param>
        /// <param name="command">Modelo de datoa a actualizar</param>
        /// <returns></returns>
        [HttpPut("{id}/diasnostic/{diasnostic-id}")]
        public async Task<ActionResult<Unit>> updateDiasnosticById(int id, [FromRoute(Name = "diasnostic-id")] int product_id, UpdateDiasnosticCommand command)
        {
            command.setOptionId(id);
            command.setDiasnosticId(product_id);
            return await _mediator.Send(command);
        }

        /// <summary>
        /// Retorna ul listado de la entidad.
        /// </summary>
        /// <returns></returns>
        [HttpGet("{id}/diasnostic/list")]
        public async Task<ActionResult<IEnumerable<OptionsModel>>> GetListDiasnosticById(int id, [FromQuery] GetListDiasnosticByOptionIdQuery model)
        {
            model.setId(id);
            return Ok(await _mediator.Send(model));
        }

        /// <summary>
        /// Retorna ul listado de la entidad.
        /// </summary>
        /// <returns></returns>
        [HttpGet("diasnostic/{id}")]
        public async Task<ActionResult<IEnumerable<OptionsModel>>> GetDiasnosticById(int id, [FromQuery] GetDiasnosticByIdQuery model)
        {
            model.setId(id);
            return Ok(await _mediator.Send(model));
        }

        /// <summary>
        /// Realiza una actualizacion de un registro dado el Identificador.
        /// </summary>
        /// <param name="id">Parametro identificador de la entidad</param>
        /// <param name="command">Modelo de datoa a actualizar</param>
        /// <returns></returns>
        [HttpPut("{id}/tratament")]
        public async Task<ActionResult<Unit>> createNewTratament(int id, CreateTratamentCommand command)
        {
            command.setOptionId(id);
            return await _mediator.Send(command);
        }

        /// <summary>
        /// Retorna ul listado de la entidad.
        /// </summary>
        /// <returns></returns>
        [HttpGet("{id}/tratament/list")]
        public async Task<ActionResult<IEnumerable<TratamentModel>>> GetListTratamentById(int id, [FromQuery] GetListTratamentByOptionIdQuery model)
        {
            model.setId(id);
            return Ok(await _mediator.Send(model));
        }
    }
}
