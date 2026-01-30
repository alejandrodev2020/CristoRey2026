using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Middleware
{
    [Serializable] // Hacer la clase serializable
    public class NotFoundException : Exception
    {
        public int StatusCode { get; } = 404; // Código de estado HTTP

        public NotFoundException(string message) : base(message) { }

        public NotFoundException(string message, Exception innerException)
            : base(message, innerException) { }

        // Puedes agregar un constructor que acepte información adicional, como un id
        public NotFoundException(string message, int id)
            : base($"{message} (ID: {id})") { }
    }
}
