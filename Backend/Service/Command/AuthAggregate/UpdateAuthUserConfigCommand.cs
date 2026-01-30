using MediatR;

namespace Service.Command.AuthAggregate
{
    public  class UpdateAuthUserConfigCommand :  IRequest
    {
       public bool AllItemsSale { get; set; }
       public int?  CountItemsSale { get; set; }
       public bool? printNoteSale { get; set; }
       public bool? AllItemsShopping { get; set; }
       public int? countItemsShopping { get; set; }
       public bool? printNoteShopping { get; set; }
    }
}
