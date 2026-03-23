using MediatR;
using Microsoft.AspNetCore.Http;
using Service.Middleware;
using Service.Models.BaseModel;
using Service.Models.Patient;
using Service.UtilsAggregate;
using System.Security.Claims;

namespace Service.Query.DoctorQuery
{
    public class GetListClinicalHistoryByDoctorLoggedQueryHandler : IRequestHandler<GetListClinicalHistoryByDoctorLoggedQuery, ResponseGenericModel<IEnumerable<ClinicalHistoryModel>>>
    {
        private readonly IDoctorQueryRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public GetListClinicalHistoryByDoctorLoggedQueryHandler(IDoctorQueryRepository repository,
                                                                IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ResponseGenericModel<IEnumerable<ClinicalHistoryModel>>> Handle(GetListClinicalHistoryByDoctorLoggedQuery request, CancellationToken cancellationToken)
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

                    var doctor = _repository.GetDoctorByAuthUserId(userId);

                    if (doctor == null)
                    {
                        throw new NotFoundException("Paciente no encontrado para el usuario logueado.");
                    }

                    var record = _repository.GetListClinicalHistoryByDoctorId(doctor.Id);

                    return ResponseHelperQuery.Success(record, "Obtención Exitosa!");
                }
                catch (ArgumentException ex)
                {
                    return ResponseHelperQuery.BadRequest<IEnumerable<ClinicalHistoryModel>>(ex.Message);
                }
                catch (NotFoundException ex)
                {
                    return ResponseHelperQuery.NotFound<IEnumerable<ClinicalHistoryModel>>(ex.Message);
                }
                catch (Exception ex)
                {
                    return ResponseHelperQuery.ServerError<IEnumerable<ClinicalHistoryModel>>(
                        $"Se produjo un error al obtener los datos. : {ex.Message}"
                    );
                }

        }
    }
}
