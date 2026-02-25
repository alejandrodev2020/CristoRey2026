using MediatR;
using Service.Models.BaseModel;
using Service.Models.Patient;
using Service.Query.BasesQuery;

namespace Service.Query.PatientQuery
{
    public class GetListClinicalHistoryByPatientIdQuery : BaseFilterQuery, IRequest<ResponseGenericModel<GetListClinicalHistoryByPatientIdModel>>
    {
        internal int Id { get; private set; }
        public int? DoctorId { get; set; }
        public void setId(int id)
        {
            Id = id;
        }
    }
}



