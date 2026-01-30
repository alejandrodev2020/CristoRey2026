using MediatR;
using Service.Models.AuthUser;

namespace Service.Query.AuthUserQuery
{
    public class GetAuthUserByIdQuery  : IRequest<AuthUserModel>
    {
        public int Id { get; set; }
    }
}
