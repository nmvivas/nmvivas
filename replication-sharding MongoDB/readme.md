# Docs - Replicación de Bases de Datos en MongoDB con ETL y Visualización de Datos en una Aplicación Web - EN DOCKER ‼
<hr>

## ℹ Descripción del Proyecto

- Conjunto de tres réplicas de bases de datos MongoDB, con un nodo primario y dos nodos secundarios. Aplicando la arquitectura de MongoDB
RÉPLICA SET. _Revisar documentacion para más información_ 🔗 https://www.mongodb.com/docs/manual/replication/
- Con sincronización contínua y automática de datos entre los nodos para mantener la consistencia y disponibilidad de datos.
- Aplicación de ETL y Gestion de datos mediante una app web. 

## Diagrama del Sistema

![image](https://github.com/nmvivas/nmvivas/assets/75291166/430b1b4b-cd0e-4339-9138-f7ed7704d7d6)

## Tecnologías Utilizadas

📌 Docker Desktop 23.0.5

📌 Docker compose v2.17.3

📌 Next.js

📌 Node.js 18.16.1

📌 Flask 2.2.5

📌 Pyhton 3.11.3


## Guía de Instalación

- Docker Desktop: Puedes descargar Docker Desktop desde el sitio web oficial de Docker: 🔗https://www.docker.com/products/docker-desktop
- Docker Compose: Docker Compose viene incluido en Docker Desktop. No es necesario descargarlo por separado.
- Next.js: Puedes obtener información y descargar Next.js desde el sitio web oficial: 🔗https://nextjs.org/
- Node.js: Puedes descargar la última versión estable de Node.js desde el sitio web oficial de Node.js: 🔗https://nodejs.org/
- Flask: Flask es una biblioteca de Python, por lo que no requiere una descarga separada. Puedes instalar Flask utilizando el gestor de paquetes de Python, pip. Ejecuta el siguiente comando en tu terminal para instalar Flask: **pip install Flask**
- Python: Puedes descargar la última versión estable de Python desde el sitio web oficial de Python: 🔗https://www.python.org/

## Herramientas Uilizadas

📌 Visual Studio code

📌 Mongo Compass


## Arquitectura implementada
![image](https://github.com/nmvivas/nmvivas/assets/75291166/65fb5188-253a-4647-ba3f-5ebb3fe083ca)

<hr> 

## 🔴🔴 Paso a Paso 

<h> 

Una vez con el docker instalado y configurado correctamente, continuamos con la creación de la red de contenedores.

## Clona el Repositorio
1. Clona este proyecto en una carpeta de tu escritorio `git clone <url http>`
2. Abre la carpeta clonada con tu IDE favorito. De preferencia Visual Studio Code.
3. Revisa las carpetas y subcarpetas creadas.

## Creación del conjunto de Réplicas 1

5. Abre el CMD
6. digita **ip config**
7. copia la dirección IP en la que estás conectado (puede ser inalámbrica o Ethernet)
5. Abre la carpeta **sharding-mongo-espe** encontrarás las subcarpetas `bdd`, `config-server` y `mapping`
6. Cada subcarpeta contiene un archivo docker-compose.yaml
7. Abre cada uno de los `docker-compose.yaml` y reemplaza la ip que está en el archivo por TU IP.
8. Abre una terminal en el directorio de la carpeta **sharding-mongo-espe**
9. Crea los contenedores siguiendo los comandos del archivo `comandos.txt`, adjunto en la raíz de la carpeta **sharding-mongo-espe**
No olvides reemplazar la IP en este archivo también para evitar errores en la ejecución‼

### intrucciones de ejecución del archivo comandos.txt
- los comandos que dicen docker-compose, se ejecutan en la terminal del IDE (VStudio code)
- los comandos que dicen mongosh, se ejecutan  en el CMD
- Los comando para incializar se ejecutan dentro de la terminal de mongo.

🟢 Verificar la conexion a las bases de datos mediante Mongo Compass. 


## Creacion del conjunto de Réplicas 2

10. Abre la carpeta **sharding-mongo-espe2** encontrarás las subcarpetas `bdd2`, `config-server2` y `mapping2`
11. Cada subcarpeta contiene un archivo docker-compose.yaml
12. Abre cada uno de los `docker-compose.yaml` y no olvides reemplazar la ip que está en el archivo por TU IP.
13. Abre una terminal en el directorio de la carpeta **sharding-mongo-espe2**
14.  Crea los contenedores siguiendo los comandos del archivo `comandos.txt`, adjunto en la raíz de la carpeta **sharding-mongo-espe2**
No olvides reemplazar la IP en este archivo también para evitar errores en la ejecución‼

### intrucciones de ejecución del archivo comandos.txt
- los comandos que dicen docker-compose, se ejecutan en la terminal del IDE (VStudio code)
- los comandos que dicen mongosh, se ejecutan  en el CMD
- Los comando para incializar se ejecutan dentro de la terminal de mongo.

🟢 Verificar la conexion a las bases de datos mediante Mongo Compass. 


## Gestión del conjunto de réplicas 1 mediante un CRUD 

15. Abre la carpeta **users_management_api**
16. Abre una terminal en el directorio de la carpeta users_management_api
17. Ejecuta el siguiente comando `npm i`. Este permitirá instalar los paquetes de node modules necesarios.
18. Ya instalado, ejecuta el comando `npm run devStart`. Este permitirá levantar el servicio del back de nuestra aplicacion web.
19. Una vez ejecutado. Nos aparecerá una linea al final indicando el puerto en el que está corriendo. `3001`

Abre una nueva terminal en el directorio de **users_management**

20. Ejecuta el siguiente comando `npm i`. Este permitirá instalar los paquetes de node modules necesarios.
22. Ya instalado, ejecuta el comando `npm run dev`. Este permitirá levantar el servicio del front de nuestra aplicacion web.
23. Una vez ejecutado. Nos aparecerá una linea al final indicando la Url de nuestra app web
25. Abre en el navegado esa URL y verifica que la aplicacion se levantó.
26. No hay datos.
27. Abre una una nueva terminal y ejecuta el comando `node script.js` para cargar nuestra base de datos.

🟢 Verificar que los datos se hayan cargado correctamente. 
Realiza las operaciones CRUD.

## Gestión del conjunto de réplicas 2 (solo lectura)

15. Abre la carpeta **users_management_api2**
16. Abre una terminal en el directorio de la carpeta users_management_api2
17. Ejecuta el siguiente comando `npm i`. Este permitirá instalar los paquetes de node modules necesarios.
18. Ya instalado, ejecuta el comando `npm run devStart`. Este permitirá levantar el servicio del back de nuestra aplicacion web.
19. Una vez ejecutado. Nos aparecerá una linea al final indicando el puerto en el que está corriendo. `3002`

Abre una nueva terminal en el directorio de **users_management2**

20. Ejecuta el siguiente comando `npm i`. Este permitirá instalar los paquetes de node modules necesarios.
22. Ya instalado, ejecuta el comando `npm run dev`. Este permitirá levantar el servicio del front de nuestra aplicacion web.
23. Una vez ejecutado. Nos aparecerá una linea al final indicando la Url de nuestra app web
25. Abre en el navegado esa URL y verifica que la aplicacion se levantó.
26. No hay datos.
27. Abre una una nueva terminal en el directorio de  **mongo_etl_project** para ejecutar los procesos ETL
28. Ejecuta el siguiente comando `docker build -t mongo-etl . `
29. Luego, ejecuta `docker run --name mongo_etl_app mongo-etl`

Este proceso puede tardar unos minutos... ⌚

Una vez completada la tarea... el ETL carga la nueva data en el conjunto de réplicas 2. 

🟢 Verificar que los datos se hayan cargado correctamente. 
Realiza la visualizacion de datos en la App we (solo lectura).

<hr> 

# Espero que este docs te haya servido 😃💟

## 📗 Autores
👨‍💻 Cris Armas
👩‍💻 Nat Vivas
👨‍💻 Chark Zambrano






