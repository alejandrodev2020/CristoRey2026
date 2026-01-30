//using FluentValidation.Results;

namespace Service.Tools.Exceptions
{
    public  class ValidationExeption : Exception
    {
        public ValidationExeption() : base("sea producido uno o mas errores de validacion")
        {
            Errors = new List<string>();
        }
        public List<string> Errors { get; }
        //public string ErrorMessage { get; }

        //public ValidationExeption(IEnumerable<ValidationFailure> failures) : this()
        //{
        //    foreach (var failure in failures)
        //    {
        //        Errors.Add(failure.ErrorMessage);
        //    }

        //}
    }
}
    