using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Api.Controllers
{
    public class ClienteHub : Hub
    {
        // Método que el cliente puede invocar para enviar un mensaje
        public async Task EnviarMensaje(string mensaje)
        {
            // Este mensaje será enviado a todos los clientes conectados
            await Clients.All.SendAsync("RecibirMensaje", mensaje);
        }

        // Método que se ejecuta cuando un cliente se conecta
        public override async Task OnConnectedAsync()
        {
            // Puedes realizar alguna acción aquí cuando un cliente se conecta
            await base.OnConnectedAsync();
            await Clients.All.SendAsync("RecibirMensaje", "Un cliente se ha conectado");
        }

        // Método que se ejecuta cuando un cliente se desconecta
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            // Puedes realizar alguna acción aquí cuando un cliente se desconecta
            await base.OnDisconnectedAsync(exception);
            await Clients.All.SendAsync("RecibirMensaje", "Un cliente se ha desconectado");
        }
    }
}
