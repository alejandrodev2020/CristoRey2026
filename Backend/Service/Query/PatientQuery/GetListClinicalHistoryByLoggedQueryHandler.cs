using MediatR;
using Microsoft.AspNetCore.Http;
using Service.Middleware;
using Service.Models.BaseModel;
using Service.Models.Patient;
using Service.UtilsAggregate;
using System.Security.Claims;

namespace Service.Query.PatientQuery
{
    public class GetListClinicalHistoryByLoggedQueryHandler : IRequestHandler<GetListClinicalHistoryByLoggedQuery, ResponseGenericModel<GetListClinicalHistoryByPatientIdModel>>
    {
        private readonly IPatientQueryRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public GetListClinicalHistoryByLoggedQueryHandler(IPatientQueryRepository repository,
                                                             IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ResponseGenericModel<GetListClinicalHistoryByPatientIdModel>> Handle(GetListClinicalHistoryByLoggedQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var httpContext = _httpContextAccessor.HttpContext
                    ?? throw new ArgumentException("No se pudo obtener el contexto HTTP.");

                var userIdString = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out int userId))
                {
                    throw new ArgumentException("Usuario no válido.");
                }

                var patient = _repository.GetPatientByAuthUserId(userId);

                if (patient == null)
                {
                    throw new NotFoundException("Paciente no encontrado para el usuario logueado.");
                }

                var record = _repository.GetListClinicalHistoryByPatientId(
                    patient.Id,
                    request.DoctorId,
                    request.Limit,
                    request.Page
                );

                return ResponseHelperQuery.Success(record, "Obtención Exitosa!");
            }
            catch (ArgumentException ex)
            {
                return ResponseHelperQuery.BadRequest<GetListClinicalHistoryByPatientIdModel>(ex.Message);
            }
            catch (NotFoundException ex)
            {
                return ResponseHelperQuery.NotFound<GetListClinicalHistoryByPatientIdModel>(ex.Message);
            }
            catch (Exception ex)
            {
                return ResponseHelperQuery.ServerError<GetListClinicalHistoryByPatientIdModel>(
                    $"Se produjo un error al obtener los datos. : {ex.Message}"
                );
            }
        }
    }
}
