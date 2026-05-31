using MediatR;
using Microsoft.AspNetCore.Http;
using Service.Middleware;
using Service.Models.BaseModel;
using Service.Query.NotificationQuery;
using Service.UtilsAggregate;
using System.Security.Claims;

namespace Service.Query.NotificationAggregate
{
    public class GetUnreadNotificationsCountQueryHandler : IRequestHandler<GetUnreadNotificationsCountQuery, ResponseGenericModel<int>>
    {
        private readonly INotificationQueryRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetUnreadNotificationsCountQueryHandler(
            INotificationQueryRepository repository,
            IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ResponseGenericModel<int>> Handle(GetUnreadNotificationsCountQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var userIdString = _httpContextAccessor.HttpContext?
                    .User
                    .FindFirst(ClaimTypes.NameIdentifier)?
                    .Value;

                if (string.IsNullOrWhiteSpace(userIdString) ||
                    !int.TryParse(userIdString, out int userId))
                {
                    return ResponseHelperQuery.NotFound<int>("Usuario no autenticado.");
                }

                var count = _repository.GetUnreadNotificationsCount(userId);
                return ResponseHelperQuery.Success(count, "Obtención Exitosa!");
            }
            catch (ArgumentException ex)
            {
                return ResponseHelperQuery.BadRequest<int>(ex.Message);
            }
            catch (NotFoundException ex)
            {
                return ResponseHelperQuery.NotFound<int>(ex.Message);
            }
            catch (Exception ex)
            {
                return ResponseHelperQuery.ServerError<int>(
                    $"Se produjo un error al obtener los datos. : {ex.Message}"
                );
            }
        }
    }
}