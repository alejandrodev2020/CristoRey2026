using MediatR;
using Service.Models.Patient;

namespace Service.Query.DoctorQuery
{
    public class GetListClinicalHistoryByDoctorIdQuery : IRequest<IEnumerable<ClinicalHistoryModel>>
    {
        internal int Id { get; private set; }
        public DateTime? DateQuery { get; set; }
        public DateTime? DateInit { get; set; }
        public DateTime? DateEnd { get; set; }
        public void setId(int id)
        {
            Id = id;
        }
    }
}



