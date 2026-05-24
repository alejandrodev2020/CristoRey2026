using MediatR;
using Service.Models.BaseModel;
using Service.Models.Patient;

namespace Service.Query.DoctorQuery
{
    public class GetListClinicalHistoryByDoctorLoggedQuery : IRequest<ResponseGenericModel<IEnumerable<ClinicalHistoryModel>>>
    {
        public DateTime? DateQuery { get; set; }
    }
}



