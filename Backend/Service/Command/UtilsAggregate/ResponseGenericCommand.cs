namespace Service.Command.UtilsAggregate
{
    public class ResponseGenericCommand<T>
    {
        public string Code { get; set; }
        public string HttpCode { get; set; }
        public T Data { get; set; }
        public string Error { get; set; }
        public string Message { get; set; }
    }
}
