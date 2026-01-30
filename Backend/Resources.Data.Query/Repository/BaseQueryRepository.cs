using System;
using Npgsql;

namespace Resources.Data.Query.Repository
{
    public abstract class BaseQueryRepository
    {
        protected string _connectionString = string.Empty;
        public BaseQueryRepository(string connectionString = default)
        {
          
          _connectionString = !string.IsNullOrWhiteSpace(connectionString) ?
          connectionString : Environment.GetEnvironmentVariable("ConnectionStrings") ?? throw new InvalidOperationException("La cadena de conexión no está configurada.");


        }
        protected TResult ExecutionContext<TResult>(Func<NpgsqlConnection, TResult> func)
        {
            if (string.IsNullOrWhiteSpace(_connectionString))
            {
                throw new InvalidOperationException("La cadena de conexión no está configurada.");
            }

            using var connection = new NpgsqlConnection(_connectionString);
            connection.Open();
            return func(connection);
        }


    }
}
