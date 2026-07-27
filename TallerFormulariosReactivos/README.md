# TallerFormulariosReactivos

Proyecto de Angular v19 desarrollado para el taller de Formularios Reactivos (Reactive Forms) de Tecnología en Análisis y Desarrollo de Sistemas de Información - SENA.

## Requisitos

- Node.js
- Angular CLI (`npm install -g @angular/cli`)

## Cómo ejecutar el proyecto

1. Ubicarse en la carpeta del proyecto:

cd TallerFormulariosReactivos

2. Levantar el servidor de desarrollo:

ng serve

3. Abrir el navegador en `http://localhost:4200`

## Descripción

Formulario de registro de usuario construido con `FormGroup` y `FormBuilder` (Reactive Forms), con validadores integrados de Angular y un validador personalizado que compara las contraseñas ingresadas.

Funcionalidades extra implementadas:

- Mostrar/ocultar contraseña
- Validador personalizado para que el nombre de usuario no tenga espacios
- Botón para limpiar el formulario
- El formulario se deshabilita y se limpia después de un registro exitoso
- Estilos de color según el estado válido/inválido de los campos
