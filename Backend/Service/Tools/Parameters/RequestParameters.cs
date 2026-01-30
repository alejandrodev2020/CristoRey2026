namespace Service.Tools.Parameters
{
    public class RequestParameters
    {
        public int Page { get; set; }
        public int Limit { get; set; }

        public RequestParameters()
        {
            this.Page = 1;
            this.Limit = 10;
        }
        public RequestParameters(int page, int limit)
        {
            this.Page = page < 1 ? 1 : page;
            this.Limit = limit > 10 ? 10 : limit;

        }
    }
}
