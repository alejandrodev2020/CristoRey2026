# Use the .NET 8 ASP.NET runtime as the base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Use the .NET 8 SDK for building the application
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
WORKDIR /src
COPY ["Api/Api.csproj", "Api/"]
RUN dotnet restore "Api/Api.csproj"
COPY . .
WORKDIR "/src/Api"
RUN dotnet build "Api.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "Api.csproj" -c Release -o /app/publish

# Use the base image to create the final runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
RUN apk add --no-cache icu-libs tzdata
ENV TZ=America/La_Paz
ENTRYPOINT ["dotnet", "Api.dll"]
