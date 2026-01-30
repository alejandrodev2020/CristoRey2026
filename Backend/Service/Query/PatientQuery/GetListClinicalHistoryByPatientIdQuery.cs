using MediatR;
using Service.Models.Patient;
using System.Collections.Generic;

namespace Service.Query.PatientQuery
{
    public class GetListClinicalHistoryByPatientIdQuery : IRequest<IEnumerable<ClinicalHistoryModel>>
    {
        internal int Id { get; private set; }
        public int? DoctorId { get; set; }
        public void setId(int id)
        {
            Id = id;
        }
    }
}



