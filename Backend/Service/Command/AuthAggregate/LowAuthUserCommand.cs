using MediatR;

namespace Service.Command.AuthAggregate
{
    public class LowAuthUserCommand : IRequest
    {
        public int Id { get; private set; }
        public void setId(int id)
        {
            Id = id;
        }
    }
}
