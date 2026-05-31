using MediatR;
using Microsoft.AspNetCore.Http;
using Service.Middleware;
using Service.Models.BaseModel;
using Service.Models.Notification;
using Service.UtilsAggregate;
using System.Security.Claims;

namespace Service.Query.NotificationQuery
{
    public class GetMyNotificationsQueryHandler : IRequestHandler<GetMyNotificationsQuery, ResponseGenericModel<IEnumerable<NotificationModel>>>
    {
        private readonly INotificationQueryRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetMyNotificationsQueryHandler(
            INotificationQueryRepository repository,
            IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ResponseGenericModel<IEnumerable<NotificationModel>>> Handle(GetMyNotificationsQuery request,CancellationToken cancellationToken)
        {
            try
            {
                var httpContext = _httpContextAccessor.HttpContext
                    ?? throw new ArgumentException("No se pudo obtener el contexto HTTP.");

                var userIdString = httpContext.User
                    .FindFirst(ClaimTypes.NameIdentifier)?
                    .Value;

                if (string.IsNullOrEmpty(userIdString) ||
                    !int.TryParse(userIdString, out int authUserId))
                {
                    throw new ArgumentException("Usuario no válido.");
                }

                var record = _repository.GetMyNotificationsByTargetUserId(authUserId, request.OnlyUnread);

                return ResponseHelperQuery.Success(record, "Obtención Exitosa!");
            }
            catch (ArgumentException ex)
            {
                return ResponseHelperQuery.BadRequest<IEnumerable<NotificationModel>>(ex.Message);
            }
            catch (NotFoundException ex)
            {
                return ResponseHelperQuery.NotFound<IEnumerable<NotificationModel>>(ex.Message);
            }
            catch (Exception ex)
            {
                return ResponseHelperQuery.ServerError<IEnumerable<NotificationModel>>(
                    $"Se produjo un error al obtener las notificaciones. : {ex.Message}"
                );
            }
        }
    }
}