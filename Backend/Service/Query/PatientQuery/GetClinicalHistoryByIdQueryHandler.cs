using MediatR;
using Microsoft.AspNetCore.Http;
using Service.Middleware;
using Service.Models.BaseModel;
using Service.Models.Patient;
using Service.UtilsAggregate;

namespace Service.Query.PatientQuery
{
    public class GetClinicalHistoryByIdQueryHandler : IRequestHandler<GetClinicalHistoryByIdQuery,ResponseGenericModel<ClinicalHistoryModel>>
    {
        private readonly IPatientQueryRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public GetClinicalHistoryByIdQueryHandler(IPatientQueryRepository repository,
                                                             IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ResponseGenericModel<ClinicalHistoryModel>> Handle(GetClinicalHistoryByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var record = _repository.GetClinicalHistoryById(request.Id);
                return ResponseHelperQuery.Success(record, "Obtención Exitosa!");
            }
            catch (ArgumentException ex)
            {
                return ResponseHelperQuery.BadRequest<ClinicalHistoryModel>(ex.Message);
            }
            catch (NotFoundException ex)
            {
                return ResponseHelperQuery.NotFound<ClinicalHistoryModel>(ex.Message);
            }
            catch (Exception ex)
            {
                return ResponseHelperQuery.ServerError<ClinicalHistoryModel>(
                    $"Se produjo un error al obtener los datos. : {ex.Message}"
                );
            }
        }
    }
}
