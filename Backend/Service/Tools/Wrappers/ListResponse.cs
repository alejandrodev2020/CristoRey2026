using Service.Models.Client;

namespace Service.Tools.Wrappers
{
    public class ListResponse<T> 
    {
        public int Limit { get; set; }
        public int Page { get; set; }
        public int Total { get; set; }
        public IEnumerable<ClientModel> Data { get; set; }


        public ListResponse(IEnumerable<ClientModel> data, int limit, int page, int total)
        {
            this.Limit = limit;
            this.Page = page;
            this.Data = data;
            this.Total = total;
        }
    }
}
