<h1 align="center"></h1>
<h3 align="center">Airflow en Docker</h3>

<h4 align="left">Herramientas Utilizadas</h4>
- 📝 Visual Studio Code

- 💬 Python 3.11.3 <a href="https://www.python.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="20" height="20"/> </a>
  
- 📫 Docker 23.0.5

<h3 align="left">Paso a Paso</h3>
<hr>
<h3 align="left">Instalación</h3>
1. Instala Visual Studio Code en tu máquina.
   - Descarga el instalador desde [https://code.visualstudio.com](https://code.visualstudio.com) y sigue las instrucciones de instalación para tu sistema operativo.
   
2. Instala Python 3.11.3.
   - Ve al sitio web oficial de Python en [https://www.python.org](https://www.python.org) y descarga el instalador correspondiente a tu sistema operativo.
   - Sigue las instrucciones de instalación para configurar Python en tu máquina.
     
3. Configura Docker 23.0.5.
   - Visita [https://www.docker.com](https://www.docker.com) y descarga Docker para tu sistema operativo.
   - Sigue las instrucciones de instalación proporcionadas por Docker para configurar Docker en tu máquina.
     
4. Instala Docker Compose.
   - Ve al sitio web oficial de Docker Compose en [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/) y sigue 
    las instrucciones para instalar Docker Compose en tu sistema operativo.4. Instala Docker Compose.

<hr> 

<h3 align="left">Configuración de docker compose</h3>
El archivo se encuentra en el repositorio con el nombre ***docker-compose.yaml***
Este es un archivo de configuración de Docker Compose que define los servicios necesarios para ejecutar Apache Airflow en contenedores Docker.
Está estructurado de la siguiente manera: 

### Versión
La versión utilizada en este archivo de configuración de Docker Compose es `3.7`. Asegúrate de tener instalada la versión adecuada de Docker Compose para que funcione correctamente.
### Servicios
El archivo de configuración define los siguientes servicios:

Este código de Docker Compose define dos servicios: webserver y scheduler. 
- El servicio webserver utiliza la imagen apache/airflow:2.6.2 y se reinicia siempre.
- Está configurado para usar un executor local, una conexión de base de datos PostgreSQL, y se ha proporcionado una clave Fernet para encriptar los datos.
- Además, se crea un usuario de Airflow con el rol de administrador.
- El servicio webserver expone el puerto 8080 y monta volúmenes para los DAGs, logs y plugins de Airflow.

El servicio scheduler depende del servicio webserver y utiliza la misma imagen apache/airflow:2.6.2. 
- Está configurado para utilizar el mismo executor local y la misma conexión de base de datos que el servicio webserver.
- Monta los mismos volúmenes y realiza una inicialización de la base de datos de Airflow antes de ejecutar el scheduler.

  ***Recuerda ajustar las variables de entorno, los volúmenes y los puertos según tus necesidades. Además, asegúrate de tener la red apachetl correctamente configurada en tu entorno Docker.***

<hr>

<h3 align="left">Configuracion d ela base de Datos</h3>

Para la configuración de la base de datos, se utilizó DBeaver, una herramienta de gestión de bases de datos. A continuación, se detallan los pasos para configurar la conexión con PostgreSQL y crear una base de datos para Airflow.

1. Instala DBeaver en tu máquina.
   - Descarga el instalador de DBeaver desde [https://dbeaver.io](https://dbeaver.io) y sigue las instrucciones de instalación para tu sistema operativo.

2. Abre DBeaver y crea una nueva conexión.
   - Haz clic en "Nuevo" para crear una nueva conexión a la base de datos.
   - Selecciona "PostgreSQL" como el tipo de base de datos.

3. Configura la conexión a PostgreSQL.
   - Ingresa los siguientes detalles de conexión:
     - Host: `localhost` (o la dirección IP del contenedor de Docker donde se encuentra PostgreSQL)
     - Puerto: `5432`
     - Base de datos: `nath`
     - Usuario: `airflow`
     - Contraseña: (la contraseña configurada para el usuario `airflow`)
   - Haz clic en "Probar conexión" para verificar que la conexión se establece correctamente.

4. Crea la base de datos para Airflow.
   - Una vez que la conexión se haya establecido correctamente, haz clic con el botón derecho en la conexión en DBeaver y selecciona "Crear base de datos".
   - Asigna el nombre "nath" a la base de datos y confirma la creación.

5. Verifica la conexión y la base de datos.
   - Expande la conexión en DBeaver y verifica que la base de datos "nath" esté presente.

Con estos pasos, has configurado correctamente la conexión a PostgreSQL y creado la base de datos (en mi caso) "nath" para Airflow. Asegúrate de utilizar la dirección IP correcta y la contraseña adecuada para el usuario `airflow` según tu entorno.

***_Recuerda que Airflow utiliza esta base de datos para almacenar la metadatos y configuraciones relacionadas con los DAGs y tareas._***

<hr> 

<h3 align="left">Configuracion d ela base de Datos</h3>





