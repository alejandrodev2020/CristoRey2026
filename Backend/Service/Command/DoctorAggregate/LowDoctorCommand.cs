using MediatR;

namespace Service.Command.DoctorAggregate
{
    public class LowDoctorCommand : IRequest<Unit>
    {
        public int Id { get; private set; }
        public void setId(int id)
        {
            Id = id;
        }
    }
}
