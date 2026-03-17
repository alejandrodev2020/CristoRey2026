using MediatR;
using Service.Models.BaseModel;
using Service.Models.Patient;
using Service.Query.BasesQuery;

namespace Service.Query.PatientQuery
{
    public class GetListClinicalHistoryByLoggedQuery : BaseFilterQuery, IRequest<ResponseGenericModel<GetListClinicalHistoryByPatientIdModel>>
    {
        public int? DoctorId { get; set; }
    }
}



