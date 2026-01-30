namespace Resources.Domain.Entities
{
    public interface IBaseClassifier
    {
        int Id { get; }
        string Name { get; }
        bool Status { get; }
    }
}