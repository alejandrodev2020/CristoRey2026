using MediatR;
using Microsoft.AspNetCore.Http;
using Service.Middleware;
using Service.Models.BaseModel;
using Service.Models.Patient;
using Service.UtilsAggregate;

namespace Service.Query.PatientQuery
{
    public class GetListClinicalHistoryByPatientIdQueryHandler : IRequestHandler<GetListClinicalHistoryByPatientIdQuery, ResponseGenericModel<GetListClinicalHistoryByPatientIdModel>>
    {
        private readonly IPatientQueryRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public GetListClinicalHistoryByPatientIdQueryHandler(IPatientQueryRepository repository,
                                                             IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ResponseGenericModel<GetListClinicalHistoryByPatientIdModel>> Handle(GetListClinicalHistoryByPatientIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var record = _repository.GetListClinicalHistoryByPatientId(request.Id, request.DoctorId,request.Limit,request.Page);
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
