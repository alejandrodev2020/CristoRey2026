using Dapper;
using Resources.Data.Query.Repository;
using Service.Models.AuthUser;
using Service.Models.Classifier;
using Service.Query.AuthUserQuery;
using System.Collections.Generic;
using System.Linq;

namespace Data.Query.Repository
{
    public class AuthUserQueryRepository : BaseQueryRepository, IAuthUserQueryRepository
    {
        public AuthUserQueryRepository(string connectionString) : base(connectionString)
        {
        }

        public IEnumerable<AuthUserModel> GetListAuthUser()
        {
            const string quote = "\"";
            var sql = @"SELECT  " + quote + "A" + quote + "." + quote + "nAuthUserId" + quote + " " + quote + "Id" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sFirstName" + quote + " " + quote + "FirstName" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sLastName" + quote + " " + quote + "LastName" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sPhone" + quote + " " + quote + "Phone" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sCi" + quote + " " + quote + "Ci" + quote +
                             ", " + quote + "A" + quote + "." + quote + "fAvatar" + quote + " " + quote + "AvatarByte" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sUserName" + quote + " " + quote + "UserName" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sUserKey" + quote + " " + quote + "UserKey" + quote +
                             ", " + quote + "A" + quote + "." + quote + "bIsAdmin" + quote + " " + quote + "IsAdmin" + quote +
                             ", " + quote + "A" + quote + "." + quote + "nAuthRoleId" + quote + " " + quote + "AuthRoleId" + quote +
                             ", " + quote + "A" + quote + "." + quote + "bIsActive" + quote + " " + quote + "IsActive" + quote +
                             ", " + quote + "AR" + quote + "." + quote + "nAuthRoleId" + quote + " " + quote + "Id" + quote +
                             ", " + quote + "AR" + quote + "." + quote + "sDescription" + quote + " " + quote + "Name" + quote +
                         " FROM " + quote + "AuthUser" + quote + " " + quote + "A" + quote +
                     "INNER JOIN" + quote + "AuthRole" + quote + " " + quote + "AR" + quote +
                            "ON " + quote + "AR" + quote + "." + quote + "nAuthRoleId" + quote + "=" + quote + "A" + quote + "." + quote + "nAuthRoleId" + quote +
                         "ORDER BY" + quote + "nAuthUserId" + quote + "  ASC";

            var values = ExecutionContext(connection =>
            {
                var returnVale = connection.Query<AuthUserModel,
                                                  BaseClassifierModel,
                                                  AuthUserModel>(sql, (autUser, authRole) =>
                                                  {
                                                      autUser.AuthRole = authRole;
                                                      return autUser;
                                                  }).ToList();
                return returnVale;
            });
            return values;
        }

        public AuthUserModel GetAuthUserById(int id)
        {
            const string quote = "\"";
            var sql = @"SELECT  " + quote + "A" + quote + "." + quote + "nAuthUserId" + quote + " " + quote + "Id" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sFirstName" + quote + " " + quote + "FirstName" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sLastName" + quote + " " + quote + "LastName" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sPhone" + quote + " " + quote + "Phone" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sCi" + quote + " " + quote + "Ci" + quote +
                             ", " + quote + "A" + quote + "." + quote + "fAvatar" + quote + " " + quote + "AvatarByte" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sUserName" + quote + " " + quote + "UserName" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sUserKey" + quote + " " + quote + "UserKey" + quote +
                             ", " + quote + "A" + quote + "." + quote + "bIsAdmin" + quote + " " + quote + "IsAdmin" + quote +
                             ", " + quote + "A" + quote + "." + quote + "nAuthRoleId" + quote + " " + quote + "AuthRoleId" + quote +
                             ", " + quote + "A" + quote + "." + quote + "bIsActive" + quote + " " + quote + "IsActive" + quote +
                             ", " + quote + "AR" + quote + "." + quote + "nAuthRoleId" + quote + " " + quote + "Id" + quote +
                             ", " + quote + "AR" + quote + "." + quote + "sDescription" + quote + " " + quote + "Name" + quote +
                         " FROM " + quote + "AuthUser" + quote + " " + quote + "A" + quote +
                     "INNER JOIN" + quote + "AuthRole" + quote + " " + quote + "AR" + quote +
                            "ON " + quote + "AR" + quote + "." + quote + "nAuthRoleId" + quote + "=" + quote + "A" + quote + "." + quote + "nAuthRoleId" + quote +
                         "WHERE " + quote + "nAuthUserId" + quote + "=" + id;

            var values = ExecutionContext(connection =>
            {
                var returnVale = connection.Query<AuthUserModel, 
                                                  BaseClassifierModel,
                                                  AuthUserModel>(sql,(autUser, authRole)=> 
                                                  {
                                                      autUser.AuthRole = authRole;
                                                      return autUser;
                                                  }).SingleOrDefault();
                return returnVale;
            });
            return values;
        }

        public AuthUserModel GetAuthUserByUserNameAndUserKey(string userName, string userKey)
        {
            const string quote = "\"";
            const string quoteString = "\'";
            var sql = @"SELECT  " + quote + "A" + quote + "." + quote + "nAuthUserId" + quote + " " + quote + "Id" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sFirstName" + quote + " " + quote + "FirstName" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sLastName" + quote + " " + quote + "LastName" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sPhone" + quote + " " + quote + "Phone" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sCi" + quote + " " + quote + "Ci" + quote +
                             ", " + quote + "A" + quote + "." + quote + "fAvatar" + quote + " " + quote + "AvatarByte" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sUserName" + quote + " " + quote + "UserName" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sUserKey" + quote + " " + quote + "UserKey" + quote +
                             ", " + quote + "A" + quote + "." + quote + "bIsAdmin" + quote + " " + quote + "IsAdmin" + quote +
                             ", " + quote + "A" + quote + "." + quote + "nAuthRoleId" + quote + " " + quote + "AuthRoleId" + quote +
                             ", " + quote + "A" + quote + "." + quote + "bIsActive" + quote + " " + quote + "IsActive" + quote +

                             ", " + quote + "AR" + quote + "." + quote + "nAuthRoleId" + quote + " " + quote + "Id" + quote +
                             ", " + quote + "AR" + quote + "." + quote + "sDescription" + quote + " " + quote + "Name" + quote +


                             ", " + quote + "AC" + quote + "." + quote + "nAuthUserConfigurationId" + quote + " " + quote + "Id" + quote +
                             ", " + quote + "AC" + quote + "." + quote + "nAuthUserId" + quote + " " + quote + "AuthUserId" + quote +
                             ", " + quote + "AC" + quote + "." + quote + "bAllItemsSale" + quote + " " + quote + "AllItemsSale" + quote +
                             ", " + quote + "AC" + quote + "." + quote + "nCountItemsSale" + quote + " " + quote + "CountItemsSale" + quote +
                             ", " + quote + "AC" + quote + "." + quote + "bPrintNoteSale" + quote + " " + quote + "PrintNoteSale" + quote +
                             ", " + quote + "AC" + quote + "." + quote + "bAllItemsShopping" + quote + " " + quote + "AllItemsShopping" + quote +
                             ", " + quote + "AC" + quote + "." + quote + "nCountItemsShopping" + quote + " " + quote + "CountItemsShopping" + quote +
                             ", " + quote + "AC" + quote + "." + quote + "bPrintNoteShopping" + quote + " " + quote + "PrintNoteShopping" + quote +
                             ", " + quote + "AC" + quote + "." + quote + "bIsActive" + quote + " " + quote + "bIsActive" + quote +

                         " FROM " + quote + "AuthUser" + quote + " " + quote + "A" + quote +
                     "INNER JOIN" + quote + "AuthRole" + quote + " " + quote + "AR" + quote +
                            "ON " + quote + "AR" + quote + "." + quote + "nAuthRoleId" + quote + "=" + quote + "A" + quote + "." + quote + "nAuthRoleId" + quote +

                     "LEFT JOIN" + quote + "AuthUserConfiguration" + quote + " " + quote + "AC" + quote +
                            "ON " + quote + "AC" + quote + "." + quote + "nAuthUserId" + quote + "=" + quote + "A" + quote + "." + quote + "nAuthUserId" + quote +

                            "WHERE " + quote + "A" + quote + "." + quote + "sUserName" + quote + "=" + quoteString + userName + quoteString +
                            "AND" + quote + "A" + quote + "." + quote + "sUserKey" + quote + "=" + quoteString + userKey + quoteString;

            var values = ExecutionContext(connection =>
            {
                var returnVale = connection.Query<AuthUserModel,
                                                  BaseClassifierModel,
                                                  AuthUserConfigurationModel,
                                                  AuthUserModel>(sql, (autUser, authRole, configuration) =>
                                                  {
                                                      autUser.AuthRole = authRole;
                                                      autUser.AuthUserConfiguration = configuration;
                                                      return autUser;
                                                  }).SingleOrDefault();
                return returnVale;
            });
            return values;
        }

        public AuthUserModel GetUserNameValidate(string userName)
        {
            const string quote = "\"";
            const string quoteString = "\'";
            var sql = @"SELECT  " + quote + "A" + quote + "." + quote + "nAuthUserId" + quote + " " + quote + "Id" + quote +
                         " FROM " + quote + "AuthUser" + quote + " " + quote + "A" + quote +
                         "WHERE " + quote + "A" + quote + "." + quote + "sUserName" + quote + "=" + quoteString + userName + quoteString;

            var values = ExecutionContext(connection =>
            {
                var returnVale = connection.Query<AuthUserModel                                                
                                                  >(sql).LastOrDefault();
                return returnVale;
            });
            return values;
        }

        public IEnumerable<AuthUserModel> GetListAuthUserAdmin()
        {
            const string quote = "\"";
            var sql = @"SELECT  " + quote + "A" + quote + "." + quote + "nAuthUserId" + quote + " " + quote + "Id" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sFirstName" + quote + " " + quote + "FirstName" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sLastName" + quote + " " + quote + "LastName" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sPhone" + quote + " " + quote + "Phone" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sCi" + quote + " " + quote + "Ci" + quote +
                             ", " + quote + "A" + quote + "." + quote + "fAvatar" + quote + " " + quote + "AvatarByte" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sUserName" + quote + " " + quote + "UserName" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sUserKey" + quote + " " + quote + "UserKey" + quote +
                             ", " + quote + "A" + quote + "." + quote + "bIsAdmin" + quote + " " + quote + "IsAdmin" + quote +
                             ", " + quote + "A" + quote + "." + quote + "nAuthRoleId" + quote + " " + quote + "AuthRoleId" + quote +
                             ", " + quote + "A" + quote + "." + quote + "bIsActive" + quote + " " + quote + "IsActive" + quote +
                             ", " + quote + "AR" + quote + "." + quote + "nAuthRoleId" + quote + " " + quote + "Id" + quote +
                             ", " + quote + "AR" + quote + "." + quote + "sDescription" + quote + " " + quote + "Name" + quote +
                         " FROM " + quote + "AuthUser" + quote + " " + quote + "A" + quote +
                     "INNER JOIN" + quote + "AuthRole" + quote + " " + quote + "AR" + quote +
                            "ON " + quote + "AR" + quote + "." + quote + "nAuthRoleId" + quote + "=" + quote + "A" + quote + "." + quote + "nAuthRoleId" + quote +
                         "WHERE " + quote + "AR" + quote + "." + quote + "nAuthRoleId" + quote + "=" + 1 +  "   "   +
                       "ORDER BY" + quote + "nAuthUserId" + quote + "  ASC";

            var values = ExecutionContext(connection =>
            {
                var returnVale = connection.Query<AuthUserModel,
                                                  BaseClassifierModel,
                                                  AuthUserModel>(sql, (autUser, authRole) =>
                                                  {
                                                      autUser.AuthRole = authRole;
                                                      return autUser;
                                                  }).ToList();
                return returnVale;
            });
            return values;
        }

        public BaseClassifierModel GetRoleById(int id)
        {
            const string quote = "\"";
            const string quoteString = "\'";
            var sql = @"SELECT  " + quote + "A" + quote + "." + quote + "nAuthRoleId" + quote + " " + quote + "Id" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sDescription" + quote + " " + quote + "Name" + quote +
                             ", " + quote + "A" + quote + "." + quote + "sDescription" + quote + " " + quote + "Description" + quote +
                         " FROM " + quote + "AuthRole" + quote + " " + quote + "A" + quote +
                         "WHERE " + quote + "A" + quote + "." + quote + "nAuthRoleId" + quote + "=" + quoteString + id + quoteString;

            var values = ExecutionContext(connection =>
            {
                var returnVale = connection.Query<BaseClassifierModel>(sql).SingleOrDefault();
                return returnVale;
            });
            return values;
        }
    }
}