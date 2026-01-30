using MediatR;
using Service.Models.AuthUser;
using System.Collections.Generic;

namespace Service.Query.AuthUserQuery
{
    public class GetListAuthUserAdminQuery : IRequest<IEnumerable<AuthUserModel>>
    {
    }
}
