using MediatR;

namespace Service.Command.OptionsAggregate
{
    public class UpdateTratamentCommand : IRequest
    {
        internal int Id { get; private set; }
        internal int TratamentId { get; private set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public string Picture { get; set; }
        public void setOptionId(int id)
        {
            Id = id;
        }

        public void setTratamentId(int id)
        {
            TratamentId = id;
        }
    }
}
