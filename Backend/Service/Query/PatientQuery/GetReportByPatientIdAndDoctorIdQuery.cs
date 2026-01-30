using MediatR;

namespace Service.Query.PatientQuery
{
    public class GetReportByPatientIdAndDoctorIdQuery : IRequest<byte[]>
    {
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
    }
}
