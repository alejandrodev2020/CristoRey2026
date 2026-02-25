using Service.Models.BaseModel;

namespace Service.UtilsAggregate
{
    public static class ResponseHelperQuery
    {
        public static ResponseGenericModel<T> Error<T>(
            string code,
            string httpCode,
            string error,
            string message,
            T data = default!)
        {
            return new ResponseGenericModel<T>
            {
                Code = code,
                HttpCode = httpCode,
                Data = data,
                Error = error,
                Message = message
            };
        }

        public static ResponseGenericModel<T> Success<T>(T data, string message = "Operación exitosa.")
        {
            return new ResponseGenericModel<T>
            {
                Code = "COD001",
                HttpCode = "200",
                Data = data,
                Error = null,
                Message = message
            };
        }

        public static ResponseGenericModel<T> BadRequest<T>(string message, T data = default!)
            => Error("COD003", "400", "400 BAD REQUEST", message, data);

        public static ResponseGenericModel<T> NotFound<T>(string message, T data = default!)
            => Error("COD003", "404", "404 NOT FOUND", message, data);

        public static ResponseGenericModel<T> InternalServerError<T>(string message, Exception ex, T data = default!)
            => Error("COD004", "500", "500 INTERNAL SERVER ERROR", $"{message}. {ex.Message}", data);

        public static ResponseGenericModel<T> ServerError<T>(string message, T data = default!)
            => Error("COD004", "500", "500 INTERNAL SERVER ERROR", message, data);
    }
}
