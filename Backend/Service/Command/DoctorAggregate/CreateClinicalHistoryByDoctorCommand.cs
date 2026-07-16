using MediatR;
using Service.Command.UtilsAggregate;

namespace Service.Command.DoctorAggregate
{
    public class CreateClinicalHistoryByDoctorCommand : IRequest<ResponseGenericCommand<Unit>>
    {
        public DateTime? DateQuery { get; set; }
        public string Motive { get; set; }
        public string Diagnostic { get; set; }
        public string Observations { get; set; }
        public decimal? TotalCost { get; set; }
        public int OptionId { get; set; }
        public int PatientId { get; set; }
        public bool? WasPaid { get; set; }
    }
}
