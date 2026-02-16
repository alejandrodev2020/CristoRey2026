using MediatR;
using Service.Command.UtilsAggregate;
using System;

namespace Service.Command.PatientAggregate
{
    public class CreateClinicalHistoryCommand : IRequest<ResponseGenericCommand<Unit>>
    {
        public DateTime? DateQuery { get; set; }
        public string Motive { get; set; }
        public string Diagnostic { get; set; }
        public string Observations { get; set; }
        public decimal? TotalCost { get; set; }
        public int OptionId { get; set; }
        public int DoctorId { get; set; }
        public bool? WasPaid { get; set; }
    }
}
