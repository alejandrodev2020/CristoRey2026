using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Service.Command.PatientAggregate;
using Service.Middleware;
using Service.Models.Client;
using Service.Models.Patient;
using Service.Query.PatientQuery;

namespace Api.Controllers
{
    [Produces("application/json")]
    [Route("api/patient")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IHubContext<ClienteHub> _hubContext;  // Inyectamos el contexto de SignalR

        public PatientController(IMediator mediator, IHubContext<ClienteHub> hubContext)
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
        public async Task<ActionResult<PatientModel>> CreatePatient(CreatePatientCommand command)
        {
            return await _mediator.Send(command);
        }

        /// <summary>
        /// Retorna ul listado de la entidad.
        /// </summary>
        /// <returns></returns>
        [HttpGet("list")]
        //[Authorize]
        public async Task<ActionResult<IEnumerable<ClientModel>>> GetAllClient([FromQuery] GetListPatientQuery model)
        {
            return Ok(await _mediator.Send(model));
        }

        /// <summary>
        /// Realiza una baja de un registro dado el Identificador.
        /// </summary>
        /// <param name="id">Parametro identificador de la entidad</param>
        /// <param name="command">Modelo de datoa a actualizar</param>
        /// <returns></returns>
        [HttpPut("{id}/low")]
        public async Task<ActionResult<Unit>> lowClient(int id, LowPatientCommand command)
        {
            command.setId(id);
            return await _mediator.Send(command);
        }

        /// <summary>
        /// Realiza una busqueda dado el Identificador.
        /// </summary>
        /// <param name="id">parametro para realizar la busqueda</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<PatientModel>> GetClientById(int id)
        {
            return await _mediator.Send(new GetPatientByIdQuery { Id = id });
        }

        /// <summary>
        /// Realiza un guardado de registro.
        /// </summary>
        /// <param name="command">modelo de datos a guardar</param>
        /// <returns></returns>
        [HttpPost("loggin")]
        public async Task<ActionResult<PatientModel>> LogginAuthUser(LogginPatientCommand command)
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
        /// Realiza una actualizacion de un registro dado el Identificador.
        /// </summary>
        /// <param name="id">Parametro identificador de la entidad</param>
        /// <param name="command">Modelo de datoa a actualizar</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> UpdateClient(int id, UpdatePatientCommand command)
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
        [HttpPut("{id}/clinical-history")]
        public async Task<ActionResult<Unit>> CreateClinicalHistory(int id, CreateClinicalHistoryCommand command)
        {
            command.setId(id);
            return await _mediator.Send(command);
        }

        /// <summary>
        /// Realiza una busqueda dado el Identificador.
        /// </summary>
        /// <param name="id">parametro para realizar la busqueda</param>
        /// <returns></returns>
        [HttpGet("{id}/clinical-history")]
        public async Task<ActionResult<IEnumerable<ClinicalHistoryModel>>> GetClientById(int id, [FromQuery] GetListClinicalHistoryByPatientIdQuery model)
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
        [HttpPut("clinical-history/{id}/gestionary")]
        public async Task<ActionResult<Unit>> UpdateClinicalHistory(int id, UpdateClinicalHistoryCommand command)
        {
            command.setId(id);
            return await _mediator.Send(command);
        }


        /// <summary>
        /// Retorna ul listado de la entidad.
        /// </summary>
        /// <returns></returns>
        [HttpGet("report")]
        public async Task<ActionResult<byte[]>> GetReportingLetterSaleById([FromQuery] GetReportByPatientIdAndDoctorIdQuery model)
        {
            var pdfBytes = await _mediator.Send(model);
            return File(pdfBytes, "application/pdf", "ReportePaciente.pdf");
        }
    }
}
