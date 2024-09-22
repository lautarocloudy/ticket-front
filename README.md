Este proyecto utiliza Vite como herramienta de construcción rápida para aplicaciones de React. A continuación, se detallan los pasos para instalar y configurar el proyecto.

Requisitos previos
Asegúrate de tener instalados los siguientes programas en tu máquina:
Node.js 
Git

Pasos para clonar e instalar el proyecto
1. Clonar el repositorio
    Utiliza el siguiente comando para clonar el repositorio en tu máquina local:
    git clone https://github.com/usuario/proyecto-vite-react.git

2. Navegar al directorio del proyecto
    Una vez que hayas clonado el repositorio, entra en la carpeta del proyecto:
    cd nombre de la carpeta del proyecto

3. Instalar las dependencias
    Usa el siguiente comando para instalar todas las dependencias del proyecto:
    npm install

4. Configurar variables de entorno
    El archivo .env.example contiene las variables de entorno necesarias para el proyecto. Debes renombrarlo a .env para que Vite lo utilice correctamente.
    
    Por defecto, el archivo .env.example incluye la siguiente línea:
    VITE_API_URL=http://localhost:3000/api
    Si en tu configuración del servidor de back-end el puerto es diferente de 3000 (o si en algún momento cambias el puerto del back-end), necesitarás actualizar este valor en el archivo .env para reflejar el nuevo puerto.

5. Ejecución del proyecto
    Una vez que hayas hecho los cambios necesarios en el archivo .env, puedes ejecutar el proyecto en modo de desarrollo con el siguiente comando:
    npm run dev