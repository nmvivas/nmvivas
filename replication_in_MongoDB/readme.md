# Docs - Replicación de Bases de Datos en MongoDB con ETL y Visualización de Datos en una Aplicación Web - EN DOCKER ‼
<hr>

## ℹ Descripción del Proyecto

- Conjunto de tres réplicas de bases de datos MongoDB, con un nodo primario y dos nodos secundarios. Aplicando la arquitectura de MongoDB
RÉPLICA SET. _Revisar documentacion para más información_ 🔗 https://www.mongodb.com/docs/manual/replication/
- Con sincronización contínua y automática de datos entre los nodos para mantener la consistencia y disponibilidad de datos.
- Aplicación de ETL y Gestion de datos mediante una app web. 

## Diagrama del Sistema

![image](https://github.com/nmvivas/nmvivas/assets/75291166/853fb0e4-fb96-47d6-8ed7-1c2fa52562d3)


## Tecnologías Utilizadas

📌 Docker Desktop 23.0.5

📌 Docker compose v2.17.3

📌 Next.js ()

📌 Node.js 18.16.1 (backend)

📌 Material UI (frontend)

📌 Flask 2.2.5

📌 Pyhton 3.11.3

⚠ No olvides tener mongo shell funcionando. 

## Guía de Instalación

- Docker Desktop: Puedes descargar Docker Desktop desde el sitio web oficial de Docker: 🔗https://www.docker.com/products/docker-desktop
- Docker Compose: Docker Compose viene incluido en Docker Desktop. No es necesario descargarlo por separado.
- Next.js: Puedes obtener información y descargar Next.js desde el sitio web oficial: 🔗https://nextjs.org/
- Node.js: Puedes descargar la última versión estable de Node.js desde el sitio web oficial de Node.js: 🔗https://nodejs.org/
- Flask: Flask es una biblioteca de Python, por lo que no requiere una descarga separada. Puedes instalar Flask utilizando el gestor de paquetes de Python, pip. Ejecuta el siguiente comando en tu terminal para instalar Flask: **pip install Flask**
- Python: Puedes descargar la última versión estable de Python desde el sitio web oficial de Python: 🔗https://www.python.org/

## Herramientas Utilizadas

📌 Visual Studio code

📌 Mongo Compass


## Arquitectura implementada
![image](https://github.com/nmvivas/nmvivas/assets/75291166/65fb5188-253a-4647-ba3f-5ebb3fe083ca)

<hr> 

## 🔴🔴 Paso a Paso 

<hr> 

Una vez con el docker instalado y configurado correctamente, continuamos con la creación de la red de contenedores para el alamcenamiento de las BD. 

⚠ Se recomienda realizar una limpieza del docker antes de inciar con las configuraciones. 
Elimina las imágenes, containers y volúmenes que no utilizas. 

## Clona el Repositorio
1. Clona este proyecto en una carpeta de tu escritorio `git clone <url https>`
2. Abre la carpeta clonada con tu IDE favorito. De preferencia Visual Studio Code.
3. Revisa las carpetas y subcarpetas creadas.

<hr>

# --------  Empecemos --------
### Consideraciones Importantes ‼
-  Abre el CMD
-  digita **ip config**
-  copia la dirección IP en la que estás conectado (puede ser inalámbrica o Ethernet)
-  Y REEMPLAZA la IP en los siguientes archivos:
  ```
   - mongo_etl_project/app.py
   - sharding-mongo-espe/mapping
   - sharding-mongo-espe2/mapping2
   - users_management/app/page.js
   - users_management_api/server.js
   - users_management_api/script.js
   - users_management2/app/page.js
   - users_management_api2/server.js
   - users_management_api2/script.js
```
     
⚠ Si esta sutilizando VSTudio code, se te hará más fácil si usas `Ctrl F`

No olvides reemplazar la IP también en el archivo `comands.txt` para que se te facilite la ejecución de los próximos comandos ‼

### intrucciones para la ejecución de comandos del archivo comands.txt
- los comandos que inician con docker-compose, se ejecutan en la terminal del IDE (VStudio code)
- los comandos que inician con mongosh, se ejecutan  en el CMD (sino funciona con mongosh, intenta solo con mongo)
- Los comandos para incializar se ejecutan dentro de la terminal de mongo. (se abre con el comando anterior)

<hr> 

## Configuración del conjunto de Réplicas 1

Puedes ayudarte de los comandos en el archivo `comands.txt`

4. Abre una terminal en VStudio code en el directorio \sharding-mongo-espe
5. Ejecuta el primer comando ``` docker-compose -f config-server/docker-compose.yaml up -d ```
6. Abre una terminal CMD en tu sistema
7. Ejecuta el segundo comando `mongosh mongodb://192.168.XX.XXX:40001` . La IP debe ser la que reemplzaste. Tu propia IP.
8. Se abre la terminal de mongo
9. Ejecuta el tercer comando
    - rs.initiate(
  {
    _id: "cfgrs",
    configsvr: true,
    members: [
      { _id : 0, host : "192.168.XX.XXX:40001" },
      { _id : 1, host : "192.168.XX.XXX:40002" },
      { _id : 2, host : "192.168.XX.XXX:40003" }
    ]
  }
)

10. Si todo esta bien aparecerá un `Ok`
11. Digita `exit`
12. Vuelve al terminal de VStudio
13. Ejecuta el cuarto comando `docker-compose -f bdd/docker-compose.yaml up -d`
14. Vuelve al CMD, en tu sistema y ejecuta el quinto comando `mongosh mongodb://192.168.XX.XXX:50001`
15. Se abre la terminal de mongo
16. Ejecuta el sexto comando
    - rs.initiate(
  {
    _id: "masters",
    members: [
      { _id : 0, host : "192.168.XX.XXX:50001" },
      { _id : 1, host : "192.168.XX.XXX:50002" },
      { _id : 2, host : "192.168.XX.XXX:50003" }
    ]
  }
)

17. Si todo esta bien aparecerá un `Ok`
18. Digita `exit`
19. Vuelve al terminal de VStudio
20. Ejecuta el séptimo comando `docker-compose -f mapping/docker-compose.yaml up -d`
21. Vuelve al CMD, en tu sistema y ejecuta el octavo comando `mongosh mongodb://192.168.XX.XXX:60000`
22. Se abre la terminal de mongo
23. Ejecuta el noveno comando `sh.addShard("masters/192.168.43.112:50002,192.168.XX.XXX:50003")`
24. Digita exit
25. ### El primer conjunto de replicas está LISTO !!

🟢 Verificar la conexion a las bases de datos mediante Mongo Compass. 

<hr> 

## Configuración del conjunto de Réplicas 2

En este punto los pasos se repiten con el primer conjunto de replicas. 

26. Abre la carpeta **sharding-mongo-espe2**
27. Abre una terminal en VStudio code en el directorio \sharding-mongo-espe2
28. Ejecuta los comandos del archivo `comands.txt` con la misma secuencia de pasos que el conjunto de réplicas 1.

... (pasos anteriores)

### El segundo conjunto de replicas está LISTO !!

🟢 Verificar la conexion a las bases de datos mediante Mongo Compass. 

<hr> 

## Gestión del conjunto de réplicas 1 mediante CRUD 

29. Abre la carpeta **users_management**
30. Abre una terminal en el directorio \users_management
31. Ejecuta el comando `npm i` para instalar las dependecias de node js . 
32. Ejecuta en secuencia cada uno de los comandos proporcionados en el archivo `comands.txt`
33. Una vez ejecutado. Nos aparecerá una linea al final indicando la Url de nuestra app web
34. Abre en el navegado esa URL y verifica que la aplicacion se levantó.
35. No hay datos.
36. Abre una una nueva terminal en el directorio \users_management_api y ejecuta el comando `node script.js` para cargar nuestra base de datos.

### Listo, tenemos levantada nuestra primera aplicacion web con un CRUD de usuarios, en el puerto 3000:3000.

🟢 Verificar que los datos se hayan cargado correctamente. 
Realiza las operaciones CRUD.

<hr> 

## Gestión del conjunto de réplicas 2 (solo lectura)

37. Abre la carpeta **users_management2**
38. Abre una terminal en el directorio \users_management2
39. Ejecuta el comando `npm i` para instalar las dependecias de node js . 
40. Ejecuta en secuencia cada uno de los comandos proporcionados en el archivo `comands.txt`
41. Una vez ejecutado. Nos aparecerá una linea al final indicando la Url de nuestra app web
42. Abre en el navegado esa URL y verifica que la aplicacion se levantó.
43. No hay datos.

### Listo, tenemos levantada nuestra segunda aplicacion web solo de lectura, en el puerto 3003:3003.

### Pero no hay datos!!!!! Ejecutemos el ETL 

<hr> 

## Ejecución del API - ETL 

44. Abre una terminal en el directorio \mongo_etl_project
45. Ejecuta el siguiente comando `docker build -t mongo-etl . `
46. Luego, ejecuta el siguiente comando `docker run --name mongo_etl_app mongo-etl`

Este proceso puede tardar unos minutos... ⌚

Una vez completada la tarea... el ETL carga la nueva data en el conjunto de réplicas 2. 

🟢 Verificar que los datos se hayan cargado correctamente. 
Realiza la visualizacion de datos en la App we (solo lectura).

<hr> 

# Espero que este docs te haya servido 😃💟
### Si deseas revisar cómo se realizó la creación y configuración de las réplicas,
### Visita el siguiente enlace 🔗https://www.youtube.com/watch?v=7Lp6R4CmuKE

<hr> 

## 📗 Autores
👨‍💻 Cris Armas
👩‍💻 Nat Vivas
👨‍💻 Chark Zambrano






