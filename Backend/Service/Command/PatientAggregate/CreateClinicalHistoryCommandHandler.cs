using Domain.Entities.DoctorAggregate;
using Domain.Entities.Options;
using Domain.Entities.PatientAggregate;
using Domain.Entities.NotificationAggregate; // 👈 NUEVO: Namespace de tu entidad
using MediatR;
using Microsoft.AspNetCore.Http;
using Service.Command.UtilsAggregate;
using Service.Notifications;
using System.Security.Claims;

namespace Service.Command.PatientAggregate
{
    public class CreateClinicalHistoryCommandHandler : IRequestHandler<CreateClinicalHistoryCommand, ResponseGenericCommand<Unit>>
    {
        private readonly IPatientRepository _repository;
        private readonly IDoctorRepository _repositoryDoctor;
        private readonly IOptionsRepository _repositoryOptions;
        private readonly INotificationRepository _repositoryNotification; // 👈 NUEVO
        private readonly FirebaseNotificationService _firebase;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CreateClinicalHistoryCommandHandler(IPatientRepository repository,
                                                   FirebaseNotificationService firebase,
                                                   IDoctorRepository repositoryDoctor,
                                                   IOptionsRepository repositoryOptions,
                                                   INotificationRepository repositoryNotification, // 👈 NUEVO
                                                   IHttpContextAccessor httpContextAccessor)
        {
            _firebase = firebase;
            _repository = repository;
            _repositoryDoctor = repositoryDoctor;
            _repositoryOptions = repositoryOptions;
            _repositoryNotification = repositoryNotification; // 👈 NUEVO
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ResponseGenericCommand<Unit>> Handle(CreateClinicalHistoryCommand request, CancellationToken cancellationToken)
        {
            var response = new ResponseGenericCommand<Unit>();
            try
            {
                var userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                {
                    response.Message = "No se pudo identificar al usuario (Token inválido)";
                    response.HttpCode = "401";
                    return response;
                }

                var record = await _repository.FindByAuthUserIdAsync(userId);
                var motiveText = "";
                if (request.OptionId == 0)
                {
                    motiveText = request.Motive;
                }
                else
                {
                    var t = await _repositoryOptions.FindByIdAsyncAsnoTraking(request.OptionId);
                    motiveText = t.Description;
                }

                DateTime myDate = DateTime.UtcNow;
                if (request.DateQuery != null)
                {
                    var boliviaTimeZone = TimeZoneInfo.FindSystemTimeZoneById("America/La_Paz");
                    var localDate = DateTime.SpecifyKind(request.DateQuery.Value, DateTimeKind.Unspecified);
                    myDate = TimeZoneInfo.ConvertTimeToUtc(localDate, boliviaTimeZone);
                }

                record.CreateClinicHistory(request.DoctorId, myDate,
                    motiveText,
                    request.Diagnostic,
                    request.Observations, request.TotalCost, request.WasPaid);

                _repository.Update(record);

                // Guardamos la cita médica en la BD
                bool result = await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

                if (result)
                {
                    Console.WriteLine("✅ RESULT TRUE: La cita se guardó correctamente en BD");
                    Console.WriteLine($"📥 DoctorId recibido en request: {request.DoctorId}");
                    Console.WriteLine($"👤 UserId paciente autenticado: {userId}");
                    Console.WriteLine($"📝 Motivo: {motiveText}");
                    Console.WriteLine($"📅 Fecha UTC usada: {myDate:dd/MM/yyyy HH:mm:ss}");

                    var doctor = await _repositoryDoctor.FindDoctorWithDevicesAsync(request.DoctorId);

                    Console.WriteLine("🔎 Resultado de FindDoctorWithDevicesAsync");
                    Console.WriteLine($"👨‍⚕️ Doctor encontrado: {(doctor != null ? "SI" : "NO")}");

                    if (doctor != null)
                    {
                        Console.WriteLine($"👨‍⚕️ Doctor.Id: {doctor.Id}");
                        Console.WriteLine($"👨‍⚕️ Doctor.AuthUserId: {doctor.AuthUserId}");
                        Console.WriteLine($"👨‍⚕️ Doctor.LastName: {doctor.LastName}");
                        Console.WriteLine($"🔐 Doctor.AuthUser cargado: {(doctor.AuthUser != null ? "SI" : "NO")}");
                        Console.WriteLine($"📱 Devices cargados: {(doctor.AuthUser?.Devices != null ? "SI" : "NO")}");
                        Console.WriteLine($"📱 Cantidad devices: {doctor.AuthUser?.Devices?.Count ?? 0}");
                    }

                    string titulo = "Nueva Cita Agendada";
                    string mensaje = $"Hola Dr. {doctor?.LastName}, tiene una nueva cita de {motiveText} para el {myDate:dd/MM/yyyy HH:mm}.";

                    Console.WriteLine($"🔔 Título notificación: {titulo}");
                    Console.WriteLine($"🔔 Mensaje notificación: {mensaje}");

                    try
                    {
                        Console.WriteLine("💾 INICIO guardado de notificación en BD");

                        if (doctor != null)
                        {
                            Console.WriteLine($"💾 Creando notificación para targetUserId: {doctor.AuthUserId}");
                            Console.WriteLine($"💾 senderUserId: {userId}");
                            Console.WriteLine($"💾 actionUrl record.Id: {record.Id}");

                            var dbNotification = Notification.CreateNotification(
                                targetUserId: doctor.AuthUserId,
                                senderUserId: userId,
                                title: titulo,
                                message: mensaje,
                                type: "NEW_APPOINTMENT",
                                actionUrl: record.Id.ToString()
                            );

                            Console.WriteLine("💾 Notification.CreateNotification OK");

                            _repositoryNotification.Add(dbNotification);

                            Console.WriteLine("💾 _repositoryNotification.Add OK");
                            Console.WriteLine("💾 Guardando notificación en UnitOfWork...");

                            var notificationSaved = await _repository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

                            Console.WriteLine($"💾 Resultado guardado notificación: {notificationSaved}");
                        }
                        else
                        {
                            Console.WriteLine("⚠️ No se guarda notificación en BD porque doctor es NULL");
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("❌ ERROR guardando notificación en BD");
                        Console.WriteLine($"❌ Message: {ex.Message}");
                        Console.WriteLine($"❌ StackTrace: {ex.StackTrace}");
                        Console.WriteLine(ex.ToString());
                    }
                    try
                    {
                        Console.WriteLine("🚀 INICIO envío Firebase Push");

                        if (doctor == null)
                        {
                            Console.WriteLine("⚠️ No se envía Firebase porque doctor es NULL");
                        }
                        else if (doctor.AuthUser == null)
                        {
                            Console.WriteLine("⚠️ No se envía Firebase porque doctor.AuthUser es NULL");
                        }
                        else if (doctor.AuthUser.Devices == null)
                        {
                            Console.WriteLine("⚠️ No se envía Firebase porque doctor.AuthUser.Devices es NULL");
                        }
                        else if (!doctor.AuthUser.Devices.Any())
                        {
                            Console.WriteLine("⚠️ No se envía Firebase porque el doctor no tiene devices");
                        }
                        else
                        {
                            Console.WriteLine($"📱 Devices encontrados: {doctor.AuthUser.Devices.Count}");

                            var devicesWithToken = doctor.AuthUser.Devices
                                .Where(x => !string.IsNullOrWhiteSpace(x.DeviceToken))
                                .ToList();

                            Console.WriteLine($"📱 Devices con token válido: {devicesWithToken.Count}");

                            foreach (var device in doctor.AuthUser.Devices)
                            {
                                Console.WriteLine("📱 DEVICE ENCONTRADO");
                                Console.WriteLine($"📱 Device.Id: {device.Id}");
                                Console.WriteLine($"📱 DeviceToken vacío: {string.IsNullOrWhiteSpace(device.DeviceToken)}");
                                Console.WriteLine($"📱 DeviceToken: {device.DeviceToken}");
                            }

                            foreach (var device in devicesWithToken)
                            {
                                try
                                {
                                    Console.WriteLine("📡 Enviando notificación Firebase...");
                                    Console.WriteLine($"📱 Device.Id: {device.Id}");
                                    Console.WriteLine($"📱 Token destino: {device.DeviceToken}");

                                    var messageId = await _firebase.SendAsync(
                                        device.DeviceToken,
                                        titulo,
                                        mensaje,
                                        new Dictionary<string, string>
                                        {
                        { "type", "NEW_APPOINTMENT" },
                        { "patientId", record.Id.ToString() }
                                        }
                                    );

                                    Console.WriteLine($"✅ Firebase enviado correctamente. MessageId: {messageId}");
                                }
                                catch (FirebaseAdmin.Messaging.FirebaseMessagingException fbEx)
                                {
                                    Console.WriteLine($"❌ ERROR Firebase enviando al Device.Id: {device.Id}");
                                    Console.WriteLine($"❌ Token problemático: {device.DeviceToken}");
                                    Console.WriteLine($"❌ Firebase ErrorCode: {fbEx.ErrorCode}");
                                    Console.WriteLine($"❌ Firebase Message: {fbEx.Message}");
                                    Console.WriteLine(fbEx.ToString());

                                    // Importante:
                                    // No lanzamos throw aquí para que continúe enviando a los demás tokens.
                                    // Este token probablemente está vencido, desinstalado o pertenece a otro proyecto Firebase.
                                }
                                catch (Exception ex)
                                {
                                    Console.WriteLine($"❌ ERROR general enviando al Device.Id: {device.Id}");
                                    Console.WriteLine($"❌ Token problemático: {device.DeviceToken}");
                                    Console.WriteLine($"❌ Message: {ex.Message}");
                                    Console.WriteLine($"❌ StackTrace: {ex.StackTrace}");
                                    Console.WriteLine(ex.ToString());

                                    // No lanzamos throw aquí para que continúe con los demás dispositivos.
                                }
                            }

                            Console.WriteLine("🏁 FIN envío Firebase Push");
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("❌ ERROR inesperado preparando envío Firebase");
                        Console.WriteLine($"❌ Message: {ex.Message}");
                        Console.WriteLine($"❌ StackTrace: {ex.StackTrace}");
                        Console.WriteLine(ex.ToString());
                    }
                }
            }
            catch (Exception ex)
            {
                response.Message = "Error interno al procesar el registro del dispositivo";
                response.Error = ex.Message;
                response.HttpCode = "500";
            }

            return response;
        }
    }
}