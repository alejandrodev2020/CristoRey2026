using MediatR;
using Service.Models.Patient;

namespace Service.Query.DoctorQuery
{
    public class GetListClinicalHistoryByDoctorIdQuery : IRequest<IEnumerable<ClinicalHistoryModel>>
    {
        internal int Id { get; private set; }
        public DateTime? DateQuery { get; set; }
        public void setId(int id)
        {
            Id = id;
        }
    }
}



