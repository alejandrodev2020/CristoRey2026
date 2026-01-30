using Service.Models.AuthUser;
using Service.Models.Classifier;
using System.Collections.Generic;

namespace Service.Query.AuthUserQuery
{
    public interface IAuthUserQueryRepository
    {
        public AuthUserModel GetAuthUserById(int id);
        public AuthUserModel GetAuthUserByUserNameAndUserKey(string userName, string userKey);
        public AuthUserModel GetUserNameValidate(string userName);
        public IEnumerable<AuthUserModel> GetListAuthUser();
        public IEnumerable<AuthUserModel> GetListAuthUserAdmin();
        public BaseClassifierModel GetRoleById(int id);
    }
}
