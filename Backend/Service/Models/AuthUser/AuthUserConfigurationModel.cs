namespace Service.Models.AuthUser
{
    public class AuthUserConfigurationModel
    {
        public int Id { get; set; }
        public int AuthUserId { get; set; }
        public bool? AllItemsSale { get; set; }
        public int? CountItemsSale { get; set; }
        public bool? PrintNoteSale { get; set; }
        public bool? AllItemsShopping { get; set; }
        public int? CountItemsShopping { get; set; }
        public bool? PrintNoteShopping { get; set; }
        public bool IsActive { get; set; }
    }
}
