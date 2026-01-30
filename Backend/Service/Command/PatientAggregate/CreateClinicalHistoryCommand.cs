using MediatR;
using System;

namespace Service.Command.PatientAggregate
{
    public class CreateClinicalHistoryCommand : IRequest<Unit>
    {
        internal int Id { get; private set; }
        public DateTime? DateQuery { get; set; }
        public string Motive { get; set; }
        public string Diagnostic { get; set; }
        public string Observations { get; set; }
        public decimal? TotalCost { get; set; }
        public int OptionId { get; set; }
        public int DoctorId { get; set; }
        public bool? WasPaid { get; set; }

        public void setId(int id)
        {
            Id = id;
        }
    }
}
