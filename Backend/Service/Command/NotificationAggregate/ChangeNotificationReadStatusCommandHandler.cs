using Domain.Entities.NotificationAggregate;
using MediatR;
using Service.Command.UtilsAggregate;

namespace Service.Command.NotificationAggregate
{
    public class ChangeNotificationReadStatusCommandHandler : IRequestHandler<ChangeNotificationReadStatusCommand, ResponseGenericCommand<bool>>
    {
        private readonly INotificationRepository _repository;
        public ChangeNotificationReadStatusCommandHandler(INotificationRepository repository)
        {
            _repository = repository;
        }

        public async Task<ResponseGenericCommand<bool>> Handle(ChangeNotificationReadStatusCommand request, CancellationToken cancellationToken)
        {
            var response = new ResponseGenericCommand<bool>();

            try
            {
                var notification = await _repository.FindByIdAsync(request.NotificationId);

                if (notification == null)
                {
                    response.Message = "Notificación no encontrada.";
                    response.HttpCode = "404";
                    response.Data = false;
                    return response;
                }

                notification.MarkAsRead();

                _repository.Update(notification);

                bool result = await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

                if (result)
                {
                    response.Message = "Notificación marcada como leída.";
                    response.Code = "COD001";
                    response.HttpCode = "200";
                    response.Data = true;
                }
                else
                {
                    response.Message = "No se pudieron guardar los cambios en la base de datos.";
                    response.HttpCode = "500";
                    response.Data = false;
                }
            }
            catch (Exception ex)
            {
                response.Message = "Error interno al marcar la notificación como leída.";
                response.Error = ex.Message;
                response.HttpCode = "500";
                response.Data = false;
            }

            return response;
        }
    }
}
