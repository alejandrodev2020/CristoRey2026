using Api.Controllers;
using Data.Command;
using Data.Query;
using MediatR;
using Microsoft.OpenApi.Models;
using OpenAI;
using Service;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;


var builder = WebApplication.CreateBuilder(args);

// Cargar configuración
builder.Configuration
       .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
       .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
       .AddEnvironmentVariables();

var firebasePath = Path.Combine(
    builder.Environment.ContentRootPath,
    "admin",
    "firebase-admin.json"
);

if (!File.Exists(firebasePath))
{
    throw new Exception($"No se encontró firebase-admin.json en: {firebasePath}");
}

if (FirebaseApp.DefaultInstance == null)
{
    FirebaseApp.Create(new AppOptions
    {
        Credential = GoogleCredential.FromFile(firebasePath)
    });
}

var connectionStr = builder.Configuration.GetConnectionString("DefaultConnection");

// Configurar servicios
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMyOrigin", p =>
    {
        p.AllowAnyOrigin()
         .AllowAnyHeader()
         .AllowAnyMethod();
    });
});


builder.Services.AddHttpContextAccessor();
builder.Services.AddSignalR();
builder.Services.AddHttpClient();
//builder.Services.AddStackExchangeRedisCache(options => options.Configuration = Environment.GetEnvironmentVariable("REDIS_CONNECTION"));

builder.Services.AddApplicationLayer();
builder.Services.AddMediatR(typeof(Program).Assembly);
builder.Services.AddControllers();
builder.Services.AddPersistenceInfraestructure(connectionStr);
builder.Services.RegisterDataQuery(connectionStr);

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebApi Initial", Version = "v1" });

    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "JWT Authentication",
        Description = "Enter JWT Bearer token",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Reference = new OpenApiReference
        {
            Id = "Bearer",
            Type = ReferenceType.SecurityScheme
        }
    };

    c.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { securityScheme, Array.Empty<string>() }
    });
});

builder.Services.AddSingleton(sp =>
{
    var apiKey = builder.Configuration["OpenAI:ApiKey"];
    return new OpenAIClient(apiKey);
});
builder.Services.AddDistributedMemoryCache();
var app = builder.Build();

// Configurar el pipeline de solicitud HTTP
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.RoutePrefix = "swagger"; // Configura Swagger en la ruta /swagger
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebApi v1");
});


app.UseCors("AllowMyOrigin");
//app.UseHttpsRedirection(); // Elimina esta línea si no estás usando HTTPS
app.UseAuthorization();
app.MapHub<ClienteHub>("/clienteHub");
app.MapControllers();
app.Run();
