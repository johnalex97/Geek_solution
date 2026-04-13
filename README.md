# Geek_solution
sitio web de geek solution

Este proyecto es un sitio web construido con React y Vite.

## Formulario de contacto

El formulario de `Solicite una asesoria tecnica` envia datos a un endpoint configurado por variable de entorno.

1. Copia `.env.example` a `.env`.
2. Define `VITE_CONTACT_FORM_ENDPOINT` con el endpoint del proveedor de formularios o correo.
3. Reinicia el servidor de desarrollo o vuelve a construir el proyecto.

Ejemplo recomendado:

```bash
VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/tu-endpoint
```

Con esta integracion, el frontend no guarda credenciales y puede conectarse a un servicio profesional como Formspree o a un endpoint propio.

## Despliegue con Docker y Easypanel

Para desplegar en un VPS usando Easypanel:

1. Asegúrate de tener Docker instalado en tu VPS.
2. Sube los archivos del proyecto al VPS.
3. En Easypanel, crea un nuevo proyecto y usa el archivo `docker-compose.yml` para desplegar.
4. El servicio se expondrá en el puerto 80.

### Construir imagen localmente (opcional)
```bash
docker build -t site-geek .
docker run -p 80:80 site-geek
```
