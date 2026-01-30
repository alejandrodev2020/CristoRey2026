using MediatR;

namespace Service.Command.PatientAggregate
{
    public class AceptClinicalHistoryCommand : IRequest<Unit>
    {
        internal int Id { get; private set; }
        public void setId(int id) 
        {
            Id = id;
        }
    }
}
