using Resources.Domain.Entities;

namespace Domain.Entities.Classifiers
{
    public class AuthRole : BaseClassifier, IAggregateRoot
    {
        protected AuthRole(string name, bool status, List<IBaseClassifier> list) : base(name, status, list)
        {
        }
        public AuthRole(int id, string name, DateTime computed, int userCode = 1, bool status = true) : base(id, name, computed, userCode, status)
        {
        }
        public static AuthRole Create(string name, bool status, List<IBaseClassifier> list)
        {
            return new AuthRole(name, status, list);
        }
        public static class Values
        {
            public const int ADMINISTRADOR = 1;
            public const int DOCTOR = 2;
            public const int PATIENT = 3;
        }
    }


}