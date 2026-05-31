using MediatR;
using Service.Models.BaseModel;

namespace Service.Query.NotificationQuery
{
    public class GetUnreadNotificationsCountQuery : IRequest<ResponseGenericModel<int>>
    {
    }
}
