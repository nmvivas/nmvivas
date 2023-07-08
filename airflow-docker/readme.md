<h1 align="center">Airflow en Docker</h1>
<h3 align="center">ETL - Data Mining (para principiantes)</h3>

<h4 align="left">Herramientas Utilizadas</h4>
- 📌 Visual Studio Code

- 📌 Python 3.11.3 <a href="https://www.python.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="20" height="20"/> </a>
  
- 📌 Docker 23.0.5
- 📌 Docker compose v2.17.3
- 📌 Dbeaver 

<h3 align="left">Paso a Paso h3>
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

<h3 align="left">Configuracion de la base de Datos</h3>

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
Una vez que ya los contenderores de docker esten funcional y pueda acceder a la interfaz de airflow. Verá algo así 
....
<h3 align="left">Creación de un DAG con procesos ETL</h3>
Este DAG utiliza un conjunto de datos en formato .csv que contiene estadísticas sobre crímenes en la India. El conjunto de datos se llama "20_Victims_of_rape.csv" y se puede encontrar en la página https://www.kaggle.com/code/himanshukamal/victims-of-rape/input?select=20_Victims_of_rape.csv.

El objetivo de este DAG es realizar un proceso ETL (Extract - Transform - Load) para cargar el archivo CSV en una base de datos PostgreSQL.

El código completo del DAG se encuentra en la carpeta "dags" de este repositorio.

***_No olvides cargar tu archivo csv en la base de datos PostgreSQL._***

### Desarrollar un DAG con procesos ETL (Extract - Trasmform - Load)
El código lo puedes encontrar en la carpeta dags de este repositorio. 

<h4 align="left">1. Importación de paquetes</h4>

Se importan los paquetes necesarios para el funcionamiento del DAG, como `DAG`, `PythonOperator`, `BranchPythonOperator`, `datetime`, `pandas`, `psycopg2` y `numpy`.

2. Extracción de la data

La función **extract_data()** utiliza la biblioteca `psycopg2` para establecer una conexión con la base de datos. Se especifican los detalles de conexión, como el host, el puerto, el nombre de usuario, la contraseña y la base de datos a la que se va a acceder.

Una vez que se han obtenido los datos, se cierran el cursor y la conexión a la base de datos, y los datos extraídos se devuelven.

3. Transformación de los Datos

La función **transform_data()** recibe un parámetro `task_instance` que representa la instancia de la tarea en Airflow. Utiliza el método xcom_pull() del objeto task_instance para obtener los datos extraídos anteriormente mediante el uso de task_ids='extract_data'.

Los datos transformados se almacenan en una lista llamada `transformed_data`. A continuación, se utiliza el método xcom_push() del objeto task_instance para guardar los datos transformados con la clave 'transformed_data' en el contexto de XCom, lo que permite compartirlos con otras tareas.

Finalmente, la función devuelve la lista transformed_data.

4. Cálculo de la Media (proceso de Data Mining)

La función **calculate_mean()** recibe un parámetro task_instance que representa la instancia de la tarea en Airflow. Utiliza el método xcom_pull() del objeto task_instance para obtener los datos transformados obtenidos en el paso anterior mediante el uso de task_ids='transform_data' y key='transformed_data'.

Dentro del bucle, se filtran los datos correspondientes a cada grupo y se calcula la media de los casos de violación reportados utilizando la función np.mean() de la biblioteca numpy.Los resultados se almacenan en un diccionario llamado means_by_group, donde la clave es el nombre del grupo y el valor es la media calculada.

5. Carga de los Datos

La **función load_data()** Obtiene los datos transformados (transformed_data) y los resultados del cálculo de la media (means_by_group) obtenidos en los pasos anteriores mediante el uso de los parámetros task_ids y key.

- Se establece una conexión con la base de datos PostgreSQL utilizando la biblioteca psycopg2.
- Se crea una tabla llamada loaded_data si no existe previamente y se ejecuta mediante el método execute() del cursor.
- Se insertan los datos en la tabla utilizando una consulta SQL parametrizada.

Una vez que se han insertado todos los datos, se realiza la confirmación de la transacción (conn.commit()) y se cierran el cursor y la conexión a la base de datos.

6. Segmentación de los Datos (proceso de Data Mining)
   
Obtiene los datos extraídos (data) del paso anterior mediante el uso de task_ids='extract_data'.

- Se seleccionan solo las columnas necesarias del resultado mediante una comprensión de lista. 
- Se extraen los campos 'area_name', 'year', 'subgroup' y 'victims_of_rape_total' de cada fila en data y se almacenan en selected_data.
- Se crea un DataFrame de pandas (df) utilizando selected_data, especificando los nombres de las columnas correspondientes.

Los resultados de ambas segmentaciones se concatenan utilizando el método concat() de pandas, y se obtiene un DataFrame (segmented_data) con los datos segmentados. Finalmente, se convierte el DataFrame segmented_data en una lista de diccionarios utilizando el método to_dict('records') de pandas.

7. Carga de los Datos Segmentados
   
La función **load_segmented_data()** obtiene los datos segmentados (transformed_data) obtenidos en el paso anterior mediante el uso del parámetro task_ids='segment_data'.

- Se establece una conexión con la base de datos PostgreSQL utilizando la biblioteca psycopg2.
- Se crea una tabla llamada segmented_data si no existe previamente.
- Se insertan los datos segmentados en la tabla utilizando una consulta SQL parametrizada.

Una vez que se han insertado todos los datos, se realiza la confirmación de la transacción (conn.commit()) y se cierran el cursor y la conexión a la base de datos. Revisar que la tabla segmented_data se haya creado correctamente en la bd. 

8. Configuración del DAG
   
El código proporcionado muestra la configuración del DAG y la creación de tareas utilizando el objeto PythonOperator en Airflow.

- Se define un diccionario `default_args` que contiene los argumentos por defecto para el DAG, como el propietario (owner) y la fecha de inicio (start_date). Estos argumentos se utilizan para establecer las características generales del DAG.
- Se crea un objeto DAG llamado etl_dag5 utilizando el constructor DAG de Airflow. Se especifica el nombre del DAG, los argumentos por defecto (default_args), una descripción y el intervalo de programación (schedule_interval) establecido como None en este caso.

9. Definición de las tareas

Se definen las tareas utilizando objetos PythonOperator. Cada tarea tiene un identificador (task_id), una función de Python (python_callable) que se ejecutará como parte de la tarea y el DAG al que pertenece (dag).

Algunas de las tareas, como transform_task, mean_task, load_task, segment_task y load_segment_task, se definen con el parámetro provide_context=True. Esto permite que la función de Python asociada a cada tarea acceda al contexto de Airflow, lo que es útil para utilizar variables y resultados de tareas anteriores.

10. Configuración de las dependecias de las tareas

Por último, se establecen las dependencias entre las tareas utilizando el operador >>. En este caso, las tareas extract_task, transform_task, mean_task, load_task y segment_task dependen de la tarea extract_task, y la tarea load_segment_task depende de la tarea segment_task.



