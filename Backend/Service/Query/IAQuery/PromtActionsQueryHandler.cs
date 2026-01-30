using MediatR;
using OpenAI;
using Service.Command.UtilsAggregate;
using Service.Models.Client;
using Service.Models.IA;
using Service.Models.Product;
using Service.Models.ToolValidator;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace Service.Query.IAQuery
{
    public class PromtActionsQueryHandler : IRequestHandler<PromtActionsQuery, ResponseIAModel>
    {
        private readonly OpenAIClient _client;
        public PromtActionsQueryHandler(OpenAIClient client)
        {
            _client = client;
        }

        public async Task<ResponseIAModel> Handle(PromtActionsQuery request, CancellationToken cancellationToken)
        {
            string apiKey = "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";
            string assistantId = "asst_W9pyxqOJqQ7qDrqTIIzTLd9t"; // tu asistente real

            using var http = new HttpClient();
            http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
            http.DefaultRequestHeaders.Add("OpenAI-Beta", "assistants=v2");

            var attachments = (request.Production)
                ? new[]
                {
                    new
                    {
                        file_id = "file-H1vbsLp1inJke5f7EY7aXm", // PRODUCTOS MSC0055 PRODUCCIÓN
                        tools = new[] { new { type = "file_search" } }
                    },
                    new
                    {
                        file_id = "file-X2Cf98CDfWJPsGDFrUwPim", // CLIENTES MSC0055 PRODUCCIÓN
                        tools = new[] { new { type = "file_search" } }
                    },
                    new
                    {
                        file_id = "file-P97Zh4tqAFZZH7G8MQrPGz", // MÉTODOS (igual para ambos)
                        tools = new[] { new { type = "file_search" } }
                    }
                            }
                            : new[]
                            {
                    new
                    {
                        file_id = "file-VJtbEk1ATYsdPHiW5ChU6w", // PRODUCTOS MSC0054 TESTING
                        tools = new[] { new { type = "file_search" } }
                    },
                    new
                    {
                        file_id = "file-D2eoTgXxKvHezrosmAuKSs", // CLIENTES MSC0054 TESTING
                        tools = new[] { new { type = "file_search" } }
                    },
                    new
                    {
                        file_id = "file-P97Zh4tqAFZZH7G8MQrPGz", // MÉTODOS (igual para ambos)
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

            string threadId = request.threadId;
            if (string.IsNullOrEmpty(threadId))
            {
                var threadResponse = await http.PostAsync("https://api.openai.com/v1/threads", null, cancellationToken);
                var threadJson = await threadResponse.Content.ReadAsStringAsync(cancellationToken);
                using var threadDoc = JsonDocument.Parse(threadJson);
                threadId = threadDoc.RootElement.GetProperty("id").GetString();
                Console.WriteLine($"🧵 Thread creado: {threadId}");
            }
            else
            {
                Console.WriteLine($"🔁 Continuando con thread existente: {threadId}");
            }

            var attachJson = JsonSerializer.Serialize(attachPayload);
            var attachResponse = await http.PostAsync(
                          $"https://api.openai.com/v1/threads/{threadId}/messages",
                          new StringContent(attachJson, Encoding.UTF8, "application/json"),
                          cancellationToken);

            var attachBody = await attachResponse.Content.ReadAsStringAsync(cancellationToken);

            var runPayload = new
            {
                assistant_id = assistantId,
                instructions = "Eres un asistente de ventas conectado a una base de datos simulada mediante archivos adjuntos. " +
                               "Debes usar el archivo 'METHODS_RESPONSE.json' como referencia para el formato de salida JSON, " +
                               "y los archivos adjuntos 'CLIENTS' y 'PRODUCTOS' para obtener los IDs reales de clientes y productos. " +
                               "Tu respuesta debe ser **únicamente JSON válido**, sin texto adicional, explicaciones ni comentarios. " +
                               "Asegúrate de incluir siempre los siguientes campos obligatorios: " +
                               "'actions', 'actionTypeId', 'client' (con todos sus campos completos, incluyendo 'id' y 'nClientId'), " +
                               "y 'details' (con todos sus campos, incluyendo 'nProductId', 'sCode' y 'amount' si se especifica). " +
                               "Nunca inventes IDs; si un cliente o producto no existe en los archivos adjuntos, " +
                               "devuelve el campo con valor null y agrega un campo 'message' indicando el error dentro del JSON. " +
                               "Si el usuario menciona varios productos, inclúyelos todos en el arreglo 'details'. " +
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

                if (string.IsNullOrWhiteSpace(statusJson) || !statusJson.TrimStart().StartsWith("{"))
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"⚠️ Respuesta inesperada al consultar el estado del run: {statusJson}");
                    Console.ResetColor();
                    break; // salir del bucle o retornar error controlado
                }

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

            // 🔹 Limpiar formato markdown si viene con ```json
            var cleanJson = resultText
                .Replace("```json", "")
                .Replace("```", "")
                .Trim();

            // 🧾 Mostrar resultado limpio (lo que devuelve la IA)
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("\n🤖 Respuesta IA (raw):\n");
            Console.WriteLine(cleanJson);
            Console.ResetColor();

            // Deserializar string JSON
            using var jsonDoc = JsonDocument.Parse(cleanJson);
            var root = jsonDoc.RootElement;
            ClientModel clientMapped = null;
            if (root.TryGetProperty("client", out var clientElem) &&
                clientElem.ValueKind == JsonValueKind.Object)
            {
                clientMapped = new ClientModel
                {
                    Id = clientElem.TryGetProperty("id", out var idProp) && idProp.ValueKind == JsonValueKind.Number
                        ? idProp.GetInt32()
                        : 0,

                    FirstName = clientElem.TryGetProperty("sFirstName", out var firstNameProp) && firstNameProp.ValueKind == JsonValueKind.String
                        ? firstNameProp.GetString()
                        : string.Empty,

                    LastName = clientElem.TryGetProperty("sLastName", out var lastNameProp) && lastNameProp.ValueKind == JsonValueKind.String
                        ? lastNameProp.GetString()
                        : string.Empty,

                    Phone = clientElem.TryGetProperty("sPhone", out var phoneProp) && phoneProp.ValueKind == JsonValueKind.String
                        ? phoneProp.GetString()
                        : string.Empty,

                    Nit = clientElem.TryGetProperty("sNit", out var nitProp) && nitProp.ValueKind == JsonValueKind.String
                        ? nitProp.GetString()
                        : string.Empty,

                    Company = clientElem.TryGetProperty("sCompany", out var companyProp) && companyProp.ValueKind == JsonValueKind.String
                        ? companyProp.GetString()
                        : string.Empty,

                    // 🧩 Campos adicionales de tu modelo
                    ClientRateId = clientElem.TryGetProperty("nClientRateId", out var rateIdProp) && rateIdProp.ValueKind == JsonValueKind.Number
                        ? rateIdProp.GetInt32()
                        : (int?)null,

                    ClientTypeId = clientElem.TryGetProperty("nClientTypeId", out var typeIdProp) && typeIdProp.ValueKind == JsonValueKind.Number
                        ? typeIdProp.GetInt32()
                        : (int?)null,

                    ClientDiscountId = clientElem.TryGetProperty("nClientDiscountId", out var discountIdProp) && discountIdProp.ValueKind == JsonValueKind.Number
                        ? discountIdProp.GetInt32()
                        : (int?)null,

                    // 📎 Propiedades que la IA no devuelve (valores por defecto)
                    File = null,
                    Photo = null,
                    ClientZoneId = null,
                    Ubication = null,
                    HasPhoto = false,
                    IsActive = true,
                    Zone = null
                };
            }

            var productInfoIA = new Dictionary<int, (string Name, string Code, decimal Amount)>();
            if (root.TryGetProperty("details", out var detailsElem) &&
                detailsElem.ValueKind == JsonValueKind.Array)
            {
                foreach (var d in detailsElem.EnumerateArray())
                {
                    if (d.TryGetProperty("nProductId", out var pidElem) && pidElem.ValueKind == JsonValueKind.Number)
                    {
                        int productId = pidElem.GetInt32();
                        if (productInfoIA.ContainsKey(productId))
                            continue;
                        string name = d.TryGetProperty("sName", out var nameProp) && nameProp.ValueKind == JsonValueKind.String
                            ? nameProp.GetString()
                            : string.Empty;

                        string code = d.TryGetProperty("sCode", out var codeProp) && codeProp.ValueKind == JsonValueKind.String
                            ? codeProp.GetString()
                            : string.Empty;

                        decimal amount = 1;
                        if (d.TryGetProperty("amount", out var amountProp) && amountProp.ValueKind == JsonValueKind.Number)
                            amount = amountProp.GetDecimal();

                        productInfoIA[productId] = (name, code, amount);
                    }
                }
            }

            var listIds = productInfoIA.Keys.ToList();

            Console.WriteLine($"\n🧾 Client ID: {clientMapped.Id}");
            Console.WriteLine($"\n🧾 Client RateId: {clientMapped.ClientRateId}");
            Console.WriteLine($"📦 Product IDs: {string.Join(", ", listIds)}");

            string urlValidation = (request.Production)
                                            ?  $"https://autopernos-scz.takysoft.com/api/sale/ai/validation?id={request.WarehouseId}"
                                            : $"https://autoperno.takysoft.com/api/sale/ai/validation?id={request.WarehouseId}";
      
            var payload = new
            {
                clientRateId = clientMapped.ClientRateId,
                productsIds = listIds
            };

            var jsonPayload = JsonSerializer.Serialize(payload);
            using var content2 = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
            using var client = new HttpClient();
            try
            {
                Console.WriteLine($"\n🚀 Enviando validación a: {urlValidation}");
                Console.WriteLine($"📨 Body: {jsonPayload}\n");

                var response = await client.PutAsync(urlValidation, content2);

                if (response.IsSuccessStatusCode)
                {
                    var responseBody = await response.Content.ReadAsStringAsync();

                    // Deserializar respuesta del backend
                    var validationResponse = JsonSerializer.Deserialize<ResponseGenericCommand<GetListDetailsValidationModel>>(responseBody,
                        new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine("✅ Validación exitosa:\n" + responseBody);
                    Console.ResetColor();

                    // Verificar estado general de la respuesta
                    if (validationResponse is not null)
                    {
                        if (validationResponse.Code == "COD001" && validationResponse.HttpCode == "200")
                        {
                            Console.ForegroundColor = ConsoleColor.Green;
                            Console.WriteLine("🟢 Consulta válida y exitosa (COD001 - 200).");
                            Console.ResetColor();

                            var detailsForFront = validationResponse.Data.ListProducts?
                                .Select(lp =>
                                {
                                    productInfoIA.TryGetValue(lp.Product.Id, out var info);
                                    var p = lp.Product;

                                    return new ProductResponseIAModel
                                    {
                                        Id = p.Id,
                                        Name = p.Name,
                                        Code = p.Code,
                                        UnitMeasurementId = p.UnitMeasurementId,
                                        ListProductRate = p.ListProductRate,

                                        AmountRequested = info.Amount,    // cantidad entendida por la IA
                                        Stock = lp.Amount,                // stock en almacén
                                        PurcharsePrice = lp.PurcharsePrice,
                                        SuggestedPrice = lp.SuggestedPrice
                                    };
                                })
                                .ToList();

                            var responseIA = new ResponseIAModel
                            {
                                Status = 200,
                                Type = root.GetProperty("actionTypeId").GetInt32(),
                                ThreadId = threadId,
                                Messages = validationResponse.Data.Messages?.ToList() ?? new List<string>(),
                                Data = new AIDataModel
                                {
                                    Actions = root.GetProperty("actions").GetString(),
                                    ActionTypeId = root.GetProperty("actionTypeId").GetInt32(),
                                    Client = clientMapped,
                                    Details = detailsForFront // 👈 cambia el tipo de Details en AIDataModel a List<ProductResponseIAModel>
                                }
                            };

                            // Log de verificación
                            Console.ForegroundColor = ConsoleColor.Cyan;
                            Console.WriteLine("\n📦 Datos asignados correctamente al modelo ResponseIAModel");
                            Console.WriteLine($"🧾 Productos cargados: {responseIA.Data.Details?.Count ?? 0}");
                            Console.ResetColor();

                            return responseIA;
                        }
                        else
                        {
                            Console.ForegroundColor = ConsoleColor.Yellow;
                            Console.WriteLine($"⚠️ Advertencia: La respuesta indica un posible problema. Code: {validationResponse.Code}, HttpCode: {validationResponse.HttpCode}");
                            Console.ResetColor();
                        }
                    }
                    else
                    {
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine("❌ No se pudo deserializar correctamente la respuesta del backend.");
                        Console.ResetColor();
                    }
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"❌ Error en validación: {response.StatusCode}");
                    var errorText = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(errorText);
                    Console.ResetColor();
                }
            }
            catch (Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"⚠️ Excepción durante la validación: {ex.Message}");
                Console.ResetColor();
            }




            return null;
        }
    }
}
