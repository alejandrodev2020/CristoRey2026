using MediatR;

namespace Service.Command.NotificationAggregate
{
    public class ValidateTokenDeviceCommand : IRequest<bool>
    {
        public string DeviceToken { get; set; }
    }
}
