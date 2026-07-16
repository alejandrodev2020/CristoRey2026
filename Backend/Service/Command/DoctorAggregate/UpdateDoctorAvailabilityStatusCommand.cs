using MediatR;

namespace Service.Command.DoctorAggregate
{
    public class UpdateDoctorAvailabilityStatusCommand : IRequest<Unit>
    {
        public int AvailabilityStatusId { get; set; }
    }
}
