using MediatR;
using Service.Models.AuthUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Query.AuthUserQuery
{
    public class GetListAuthUserAdminQueryHandler : IRequestHandler<GetListAuthUserAdminQuery, IEnumerable<AuthUserModel>>
    {
        private readonly IAuthUserQueryRepository _repository;
        public GetListAuthUserAdminQueryHandler(IAuthUserQueryRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<AuthUserModel>> Handle(GetListAuthUserAdminQuery request, CancellationToken cancellationToken)
        {
            var listAuthUser = _repository.GetListAuthUserAdmin();
            return Task.FromResult(listAuthUser);
        }
    }
}
