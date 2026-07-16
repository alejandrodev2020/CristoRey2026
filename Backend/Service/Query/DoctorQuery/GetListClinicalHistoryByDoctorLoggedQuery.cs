using MediatR;
using Service.Models.BaseModel;
using Service.Models.Patient;

namespace Service.Query.DoctorQuery
{
    public class GetListClinicalHistoryByDoctorLoggedQuery : IRequest<ResponseGenericModel<IEnumerable<ClinicalHistoryModel>>>
    {
        public DateTime? DateQuery { get; set; }
        public DateTime? DateInit { get; set; }
        public DateTime? DateEnd { get; set; }
    }
}



