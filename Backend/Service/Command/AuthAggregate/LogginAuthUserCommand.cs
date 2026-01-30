using MediatR;
using Service.Models.AuthUser;

namespace Service.Command.AuthAggregate
{
    public class LogginAuthUserCommand : IRequest<AuthUserModel>
    {
        public string UserName { get; set; }
        public string UserKey { get; set; }
    }
}
