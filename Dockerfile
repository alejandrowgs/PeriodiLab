# Etapa 1: Construcción (Build)
FROM node:20-alpine as build
WORKDIR /app
# Copiamos los archivos de dependencias
COPY package*.json ./
# Instalamos dependencias
RUN npm install
# Copiamos el resto del código
COPY . .
# Construimos la aplicación de Vite
RUN npm run build

# Etapa 2: Servidor de Producción (Nginx)
FROM nginx:alpine
# Copiamos los archivos generados en la Etapa 1 a la carpeta de Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Exponemos el puerto 80 del contenedor
EXPOSE 80
# Iniciamos Nginx
CMD["nginx", "-g", "daemon off;"]