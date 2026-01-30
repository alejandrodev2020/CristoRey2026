using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Service.Command.DoctorAggregate;
using Service.Command.PatientAggregate;
using Service.Middleware;
using Service.Models.Doctor;
using Service.Models.Patient;
using Service.Query.DoctorQuery;

namespace Api.Controllers
{
    [Produces("application/json")]
    [Route("api/doctor")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IHubContext<ClienteHub> _hubContext;  // Inyectamos el contexto de SignalR

        public DoctorController(IMediator mediator, IHubContext<ClienteHub> hubContext)
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
        //[Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<DoctorModel>> CreateClient(CreateDoctorCommand command)
        {
            return await _mediator.Send(command);
        }

        /// <summary>
        /// Retorna ul listado de la entidad.
        /// </summary>
        /// <returns></returns>
        [HttpGet("list")]
        public async Task<ActionResult<IEnumerable<DoctorModel>>> GetListProvider()
        {
            return Ok(await _mediator.Send(new GetListDoctorQuery()));
        }



        /// <summary>
        /// Realiza una busqueda dado el Identificador.
        /// </summary>
        /// <param name="id">parametro para realizar la busqueda</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<DoctorModel>> GetDoctorId(int id)
        {
            return await _mediator.Send(new GetDoctorByIdQuery { Id = id });
        }

        /// <summary>
        /// Realiza una actualizacion de un registro dado el Identificador.
        /// </summary>
        /// <param name="id">Parametro identificador de la entidad</param>
        /// <param name="command">Modelo de datoa a actualizar</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> UpdateDoctor(int id, UpdateDoctorCommand command)
        {
            command.setId(id);
            return await _mediator.Send(command);
        }

        /// <summary>
        /// Realiza un guardado de registro.
        /// </summary>
        /// <param name="command">modelo de datos a guardar</param>
        /// <returns></returns>
        [HttpPost("loggin")]
        public async Task<ActionResult<DoctorModel>> LogginAuthUser(LogginDoctorCommand command)
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
        /// Realiza una busqueda dado el Identificador.
        /// </summary>
        /// <param name="id">parametro para realizar la busqueda</param>
        /// <returns></returns>
        [HttpGet("{id}/clinical-history")]
        public async Task<ActionResult<IEnumerable<ClinicalHistoryModel>>> GetClientById(int id, [FromQuery] GetListClinicalHistoryByDoctorIdQuery model)
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
        [HttpPut("clinical-history/{id}/acept")]
        public async Task<ActionResult<Unit>> AcpetClinicalHistory(int id, AceptClinicalHistoryCommand command)
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
        [HttpPut("clinical-history/{id}/reject")]
        public async Task<ActionResult<Unit>> RejectClinicalHistory(int id, RejectClinicalHistoryCommand command)
        {
            command.setId(id);
            return await _mediator.Send(command);
        }
    }
}
