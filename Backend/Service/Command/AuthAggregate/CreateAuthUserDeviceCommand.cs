using MediatR;
using Service.Command.UtilsAggregate;

namespace Service.Command.AuthAggregate
{
    public class CreateAuthUserDeviceCommand : IRequest<ResponseGenericCommand<Unit>>
    {
        public int AuthUserId { get; set; } 
        public string Device { get; set; }  
        public string DeviceToken { get; set; } 
        public string Platform { get; set; } 
        public string SystemVersion { get; set; } = string.Empty;
    }
}
