# Usar una imagen base de Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copiar los archivos generados por Vite en la carpeta `dist/` al contenedor
COPY dist/ /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80
