using MediatR;

namespace Service.Command.AuthAggregate
{
    public class UpdateResetPasswordCommand : IRequest
    {
        public string PreviousPassword { get; set; }
        public string NewPassword { get; set; }
        public string PasswordConfirmation { get; set; }

    }
}
