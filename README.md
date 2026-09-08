# Geek Solution

Este proyecto es un sitio web construido con React y Vite.

## Desarrollo y verificación

Usa Node.js 22.12 o superior compatible con Vite. Instala las dependencias y ejecuta el servidor local:

```bash
npm install
npm run dev
```

Antes de desplegar, ejecuta las comprobaciones completas:

```bash
npm test -- --run
npm run lint
npm run build
npm audit --omit=dev
docker compose build
```

Para revisar la compilación localmente:

```bash
npm run preview -- --host 127.0.0.1
```

Comprueba `/`, `/servicios?categoria=redes`, `/contacto`, `/portal-ayuda`, `/terminos` y `/ruta-inexistente`. La última ruta muestra la página 404 dentro de la aplicación. Vite preview permite revisar la compilación, pero no ejecuta la configuración de Nginx.

## Formulario de contacto

El formulario de `Solicite una asesoría técnica` envía datos a un endpoint configurado por variable de entorno.

1. Copia `.env.example` a `.env`.
2. Define `VITE_CONTACT_FORM_ENDPOINT` con el endpoint del proveedor de formularios o correo.
3. Reinicia el servidor de desarrollo o vuelve a construir el proyecto.

Ejemplo recomendado:

```bash
VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/tu-endpoint
```

Las variables `VITE_*` son configuración pública de compilación: sus valores se incluyen en el JavaScript que recibe el navegador. No son secretos; nunca coloques contraseñas, tokens privados ni claves de API en ellas. El endpoint debe aceptar solicitudes JSON desde el origen público del sitio (CORS).

El formulario incluye nombre, correo, teléfono opcional, tipo de atención (`empresa` o `hogar`) y mensaje. Si el endpoint no está definido o el envío falla, ofrece continuar por WhatsApp y conserva la consulta para volver a intentarlo.

Docker Compose lee `.env` para interpolar `VITE_CONTACT_FORM_ENDPOINT` en `build.args`. El archivo `.env` permanece intencionalmente excluido del contexto de construcción mediante `.dockerignore`; el Dockerfile recibe únicamente el argumento público y lo expone a Vite antes de compilar. Cambiar una variable en el contenedor Nginx ya iniciado no cambia el sitio: reconstruye la imagen al actualizar el endpoint.

```bash
docker compose config
docker compose up -d --build
```

En Easypanel, configura `VITE_CONTACT_FORM_ENDPOINT` como argumento de construcción o variable utilizada por Compose, y vuelve a desplegar con reconstrucción.

## Despliegue con Docker y Easypanel

Para desplegar en un VPS usando Easypanel:

1. Asegúrate de tener Docker instalado en tu VPS.
2. Sube los archivos del proyecto al VPS.
3. En Easypanel, crea un nuevo proyecto y usa el archivo `docker-compose.yml` para desplegar.
4. El servicio se expondrá en el puerto 80.

Nginx conserva el fallback de las rutas a `index.html`, que requiere revalidación (`no-cache`). Los archivos compilados de `/assets/` tienen caché inmutable por un año; las imágenes y fuentes públicas con nombres estables tienen caché de un día. Se incluyen las cabeceras `X-Content-Type-Options`, `Referrer-Policy` y `Permissions-Policy`. HTTPS y HSTS corresponden a Easypanel o al proxy que termina TLS.

### Construir imagen localmente (opcional)

```bash
docker build --build-arg VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/tu-endpoint -t site-geek .
docker run -p 80:80 site-geek
```
