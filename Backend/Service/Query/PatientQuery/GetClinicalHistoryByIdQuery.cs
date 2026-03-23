using MediatR;
using Service.Models.BaseModel;
using Service.Models.Patient;

namespace Service.Query.PatientQuery
{
    public class GetClinicalHistoryByIdQuery : IRequest<ResponseGenericModel<ClinicalHistoryModel>>
    {
        internal int Id { get; private set; }
        public void setId(int id)
        {
            Id = id;
        }
    }
}
