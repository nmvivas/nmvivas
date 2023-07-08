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
<h4 align="left">Configuración de docker compose</h4>
El archivo se encuentra en el repositorio con el nombre docker-compose.yaml
Este es un archivo de configuración de Docker Compose que define los servicios necesarios para ejecutar Apache Airflow en contenedores Docker.
Está estructurado de la siguiente manera: 

### Versión
La versión utilizada en este archivo de configuración de Docker Compose es `3.7`. Asegúrate de tener instalada la versión adecuada de Docker Compose para que funcione correctamente.
### Servicios
El archivo de configuración define los siguientes servicios:
"revisar docker-compose.yaml"

Este código de Docker Compose define dos servicios: webserver y scheduler. 
- El servicio webserver utiliza la imagen apache/airflow:2.6.2 y se reinicia siempre.
- Está configurado para usar un executor local, una conexión de base de datos PostgreSQL, y se ha proporcionado una clave Fernet para encriptar los datos.
- Además, se crea un usuario de Airflow con el rol de administrador.
- El servicio webserver expone el puerto 8080 y monta volúmenes para los DAGs, logs y plugins de Airflow.

El servicio scheduler depende del servicio webserver y utiliza la misma imagen apache/airflow:2.6.2. 
- Está configurado para utilizar el mismo executor local y la misma conexión de base de datos que el servicio webserver.
- Monta los mismos volúmenes y realiza una inicialización de la base de datos de Airflow antes de ejecutar el scheduler.




