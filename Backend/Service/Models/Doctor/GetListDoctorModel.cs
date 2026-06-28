namespace Service.Models.Doctor
{
    public class GetListDoctorModel
    {
        public int Limit { get; set; }
        public int Page { get; set; }
        public int Total { get; set; }
        public IEnumerable<DoctorModel> ListSale { get; set; } = Enumerable.Empty<DoctorModel>();
    }
}
