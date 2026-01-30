using MediatR;
using Service.Models.AuthUser;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Query.AuthUserQuery
{
    public class GetAuthUserByIdQueryHandler : IRequestHandler<GetAuthUserByIdQuery, AuthUserModel>
    {
        private readonly IAuthUserQueryRepository _repository; 
        public GetAuthUserByIdQueryHandler(IAuthUserQueryRepository repository)
        {
            _repository = repository;
        }

        public Task<AuthUserModel> Handle(GetAuthUserByIdQuery request, CancellationToken cancellationToken)
        {
            var record = _repository.GetAuthUserById(request.Id);
            if (record.AvatarByte != null)
            {
                record.Avatar = Convert.ToBase64String(record.AvatarByte);
            }
            return Task.FromResult(record);
        }
    }
}
