using MediatR;

namespace Service.Command.OptionsAggregate
{
    public class CreateOptionsCommand: IRequest<Unit>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public string Picture { get; set; }
    }
}
