using MediatR;

namespace Service.Command.OptionsAggregate
{
    public class CreateTratamentCommand : IRequest
    {
        internal int Id { get; private set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public string Picture { get; set; }
        public void setOptionId(int id)
        {
            Id = id;
        }
    }
}
