using MediatR;

namespace Service.Command.AuthAggregate
{

    public class CreateAuthUserCommand :IRequest
    {  
            public string FirstName { get; set; }
            public string LastName  {get; set;}
            public string Phone  {get; set;}
            public string Ci  {get; set;}
            public string? Avatar  {get; set;}
            public string UserName  {get; set;}
            public string UserKey  {get; set;}
            public bool? IsAdmin  {get; set;}
            public int? AuthRoleId { get; set; }
    }
}
