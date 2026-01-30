using System;

namespace Service.Middleware
{
    [Serializable]
    public class InvalidCredentialsException : Exception
    {
        public int StatusCode { get; } = 401; // Código de estado HTTP 401: Unauthorized

        public InvalidCredentialsException(string message) : base(message) { }

        public InvalidCredentialsException(string message, Exception innerException)
            : base(message, innerException) { }

        // Puedes agregar un constructor que acepte información adicional, como un id
        public InvalidCredentialsException(string message, int id)
            : base($"{message} (ID: {id})") { }
    }
}
