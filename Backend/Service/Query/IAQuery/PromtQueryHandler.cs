using MediatR;
using OpenAI;
using OpenAI.Chat;
using Service.Models.IA;
using System;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Service.Query.IAQuery
{
    public class PromtQueryHandler : IRequestHandler<PromtQuery, ResponseIAModel>
    {
        private readonly OpenAIClient _client;

        public PromtQueryHandler(OpenAIClient client)
        {
            _client = client;
        }

        //public async Task<ResponseIAModel> Handle(PromtQuery request, CancellationToken cancellationToken)
        //{
        //    // Crear el conjunto de mensajes
        //    var messages = new List<Message>
        //    {
        //        new Message(Role.System, "Eres un asistente útil que responde brevemente."),
        //        new Message(Role.User, request.Prompt)
        //    };

        //    // Crear la solicitud al modelo
        //    //var chatRequest = new ChatRequest(
        //    //    messages: messages,
        //    //    model: "gpt-4o-mini"
        //    //);

        //    // Crear la solicitud al modelo
        //    //var chatRequest = new ChatRequest(
        //    //    messages: messages,
        //    //    model: "gpt - 4o"
        //    //);

        //    // Crear la solicitud al modelo
        //    //var chatRequest = new ChatRequest(
        //    //    messages: messages,
        //    //    model: "gpt-3.5-turbo"
        //    //);

        //    var chatRequest = new ChatRequest(
        //        messages: messages,
        //        model: "gpt-4o-mini"
        //    );



        //    // Ejecutar la solicitud al endpoint de Chat
        //    var response = await _client.ChatEndpoint.GetCompletionAsync(chatRequest);

        //    // Tomar la respuesta generada
        //    var text = response?.FirstChoice?.Message?.Content?.ToString() ?? "Sin respuesta";

        //    Console.WriteLine("🤖 Respuesta IA: " + text);

        //    // Devolver estructura nula según tu modelo
        //    return new ResponseIAModel
        //    {
        //        SaleFast = false,
        //        OrderDetails = null
        //    };
        //}

        public async Task<ResponseIAModel> Handle(PromtQuery request, CancellationToken cancellationToken)
        {
            string apiKey = "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";
            string assistantId = "asst_W9pyxqOJqQ7qDrqTIIzTLd9t"; // tu asistente real
            //string fileId = "file-RvmJtchg3HVmtRwc6xDzkT";


            using var http = new HttpClient();
            http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
            http.DefaultRequestHeaders.Add("OpenAI-Beta", "assistants=v2");




            //var attachPayload = new
            //{
            //    role = "user",
            //    content = new[]
            //    {
            //        new
            //        {
            //            type = "text",
            //            text = request.Prompt
            //        }
            //    },
            //                attachments = new[]
            //                {
            //        new
            //        {
            //            file_id = "file-RvmJtchg3HVmtRwc6xDzkT", // tu file ID real
            //            tools = new[]
            //            {
            //                new { type = "file_search" }
            //            }
            //        }
            //    }
            //};

            

            var attachments = new[]
            {
                //new
                //{
                //    file_id = "file-RvmJtchg3HVmtRwc6xDzkT", // CLIENTES
                //    tools = new[] { new { type = "file_search" } }
                //},
                new
                {
                    file_id = "file-H1vbsLp1inJke5f7EY7aXm", // PRODUCTOS
                    tools = new[] { new { type = "file_search" } }
                },
                new
                {
                    file_id = "file-X2Cf98CDfWJPsGDFrUwPim", // CLIENTS
                    tools = new[] { new { type = "file_search" } }
                },
                new
                {
                    file_id = "file-P97Zh4tqAFZZH7G8MQrPGz", // METHODS
                    tools = new[] { new { type = "file_search" } }
                }
            };

            var attachPayload = new
            {
                role = "user",
                content = new[]
                {
                    new
                    {
                        type = "text",
                        text = request.Prompt
                    }
                },
                attachments
            };


            // 1️⃣ Crear thread
            var threadResponse = await http.PostAsync("https://api.openai.com/v1/threads", null, cancellationToken);
            var threadJson = await threadResponse.Content.ReadAsStringAsync(cancellationToken);
            using var threadDoc = JsonDocument.Parse(threadJson);
            string threadId = threadDoc.RootElement.GetProperty("id").GetString();
            Console.WriteLine($"🧵 Thread creado: {threadId}");




            var attachJson = JsonSerializer.Serialize(attachPayload);
            var attachResponse = await http.PostAsync(
                          $"https://api.openai.com/v1/threads/{threadId}/messages",
                          new StringContent(attachJson, Encoding.UTF8, "application/json"),
                          cancellationToken);



            var attachBody = await attachResponse.Content.ReadAsStringAsync(cancellationToken);


            // 2️⃣ Crear run (con tu prompt)
            //var runPayload = new
            //{
            //    assistant_id = assistantId,
            //    instructions = $"Responde siempre en español. {request.Prompt}"
            //};

            //var runPayload = new
            //{
            //    assistant_id = assistantId,
            //    //instructions = $"Responde siempre en español. Usa los archivos adjuntos para responder esta pregunta: {request.Prompt}"
            //    instructions =
            //                "Eres un asistente de ventas que responde únicamente en **formato JSON válido**, " +
            //                "sin texto adicional, sin explicaciones ni comentarios. " +
            //                "Tu objetivo es transformar solicitudes de ventas en estructuras JSON con este formato exacto: " +
            //                "{ " +
            //                "  actions: 'SALE', " +
            //                "  client: { id: number, name: string }, " +
            //                "  details: [ " +
            //                "    { nProductId: number, sName: string, sCode: string, amount: number?, discount: number? } " +
            //                "  ] " +
            //                "}. " +
            //                "Los campos 'amount' y 'discount' solo deben incluirse si se mencionan explícitamente en la solicitud. " +
            //                "Usa los archivos adjuntos para buscar los IDs del cliente y de los productos, " +
            //                "y devuelve únicamente la respuesta JSON sin texto adicional. " +
            //                $"Petición del usuario: {request.Prompt}"
            //};
            var runPayload = new
            {
                assistant_id = assistantId,
                instructions =
                                "Guíate únicamente del archivo METHODS_RESPONSE.json para estructurar tu respuesta. " +
                                "Responde siempre en formato JSON válido y sin texto adicional. " +
                                $"Petición del usuario: {request.Prompt}"
            };




            var runJson = JsonSerializer.Serialize(runPayload);
            var runResponse = await http.PostAsync(
                $"https://api.openai.com/v1/threads/{threadId}/runs",
                new StringContent(runJson, Encoding.UTF8, "application/json"),
                cancellationToken);

            var runBody = await runResponse.Content.ReadAsStringAsync(cancellationToken);
            using var runDoc = JsonDocument.Parse(runBody);
            string runId = runDoc.RootElement.GetProperty("id").GetString();
            Console.WriteLine($"🚀 Run iniciado: {runId}");

            // 4️⃣ Esperar a que el run termine
            string status;
            do
            {
                await Task.Delay(1500, cancellationToken);
                var statusResponse = await http.GetAsync(
                    $"https://api.openai.com/v1/threads/{threadId}/runs/{runId}",
                    cancellationToken);

                var statusJson = await statusResponse.Content.ReadAsStringAsync(cancellationToken);
                using var statusDoc = JsonDocument.Parse(statusJson);

                status = statusDoc.RootElement.GetProperty("status").GetString();
                Console.WriteLine($"⏳ Estado: {status}");
            }
            while (status != "completed" && status != "failed" && !cancellationToken.IsCancellationRequested);

            // 5️⃣ Obtener mensajes del thread (respuesta final)
            var messagesResponse = await http.GetAsync(
                $"https://api.openai.com/v1/threads/{threadId}/messages",
                cancellationToken);

            var messagesJson = await messagesResponse.Content.ReadAsStringAsync(cancellationToken);
            using var messagesDoc = JsonDocument.Parse(messagesJson);

            string resultText = "Sin respuesta";
            foreach (var item in messagesDoc.RootElement.GetProperty("data").EnumerateArray())
            {
                if (item.GetProperty("role").GetString() == "assistant")
                {
                    var content = item.GetProperty("content")[0]
                        .GetProperty("text")
                        .GetProperty("value")
                        .GetString();

                    resultText = content?.Trim() ?? "Sin respuesta";
                    break;
                }
            }

            // 🧾 Mostrar resultado en consola
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"\n🤖 {resultText}\n");
            Console.ResetColor();


            return null;
        }
    }
    
}
