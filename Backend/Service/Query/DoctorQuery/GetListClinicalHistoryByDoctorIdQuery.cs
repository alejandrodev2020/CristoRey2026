using MediatR;
using Service.Models.Patient;
using System.Collections.Generic;

namespace Service.Query.DoctorQuery
{
    public class GetListClinicalHistoryByDoctorIdQuery : IRequest<IEnumerable<ClinicalHistoryModel>>
    {
        internal int Id { get; private set; }
        public void setId(int id)
        {
            Id = id;
        }
    }
}



