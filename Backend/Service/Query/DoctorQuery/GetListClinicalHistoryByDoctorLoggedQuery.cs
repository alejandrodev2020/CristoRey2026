using MediatR;
using Service.Models.BaseModel;
using Service.Models.Patient;
using Service.Query.BasesQuery;

namespace Service.Query.DoctorQuery
{
    public class GetListClinicalHistoryByDoctorLoggedQuery : BaseFilterQuery, IRequest<ResponseGenericModel<GetListClinicalHistoryByPatientIdModel>>
    {
        public DateTime? DateQuery { get; set; }
        public DateTime? DateInit { get; set; }
        public DateTime? DateEnd { get; set; }
    }
}



