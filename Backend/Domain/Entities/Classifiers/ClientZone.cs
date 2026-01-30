using Resources.Domain.Entities;

namespace Domain.Entities.Classifiers
{
    public class ClientZone : BaseClassifier, IAggregateRoot
    {
        protected ClientZone(string name, bool status, List<IBaseClassifier> list) : base(name, status, list)
        {
        }
        public ClientZone(int id, string name, DateTime computed, int userCode = 1, bool status = true) : base(id, name, computed, userCode, status)
        {
        }
        public static ClientZone Create(string name, bool status, List<IBaseClassifier> list)
        {
            return new ClientZone(name, status, list);
        }
        public static class Values
        {
            public const int SANTA_CRUZ = 1;
        }

    
    }


}