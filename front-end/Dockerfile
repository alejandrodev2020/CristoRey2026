# Etapa 1: Construir la aplicación con Node
FROM node:16 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el package.json y el package-lock.json (si lo tienes)
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto del código fuente al contenedor
COPY . .

# Generar el build de producción de Angular
RUN npm run build --prod

# Etapa 2: Servir la aplicación con NGINX
FROM nginx:alpine

# Copiar el archivo build generado de la etapa anterior
COPY --from=build /app/dist/ /usr/share/nginx/html

# Copiar el script de reemplazo de variables al contenedor
COPY set-env-vars.sh /set-env-vars.sh

# Hacer el script ejecutable
RUN chmod +x /set-env-vars.sh

# Copiar el archivo de configuración de NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para ejecutar el script de reemplazo y luego iniciar NGINX
CMD ["/bin/sh", "-c", "/set-env-vars.sh && nginx -g 'daemon off;'"]
