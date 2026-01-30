using MediatR;
using Service.Models.AuthUser;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Query.AuthUserQuery
{
    public class GetListAuthUserQueryHandler : IRequestHandler<GetListAuthUserQuery, IEnumerable<AuthUserModel>>
    {
        private readonly IAuthUserQueryRepository _repository;
        public GetListAuthUserQueryHandler(IAuthUserQueryRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<AuthUserModel>> Handle(GetListAuthUserQuery request, CancellationToken cancellationToken)
        {
            var listAuthUser = _repository.GetListAuthUser();
            return Task.FromResult(listAuthUser);
        }
    }
}
