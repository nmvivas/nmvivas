from airflow import DAG
from airflow.operators.python_operator import PythonOperator, BranchPythonOperator
from datetime import datetime
import pandas as pd
import psycopg2
from psycopg2 import sql
import numpy as np

def extract_data():
    conn = psycopg2.connect(
        host='postgres-container',
        port='5432',
        user='airflow',
        password='airflow',
        database='nath'
    )

    cursor = conn.cursor()
    query = """
        SELECT area_name, year, subgroup, rape_cases_reported,
               victims_between_1014_yrs, victims_between_1418_yrs,
               victims_of_rape_total
        FROM public.victims_of_rape
    """
    cursor.execute(query)
    data = cursor.fetchall()
    cursor.close()
    conn.close()

    return data


def transform_data(task_instance):
    data = task_instance.xcom_pull(task_ids='extract_data')

    transformed_data = []

    for row in data:
        area_name, year, subgroup, rape_cases_reported, \
        victims_between_1014_yrs, victims_between_1418_yrs, \
        victims_of_rape_total = row

        transformed_data.append({
            'area_Name': area_name,
            'year': year,
            'subgroup': subgroup,
            'rape_cases_reported': rape_cases_reported,
            'victims_between_1014_yrs': victims_between_1014_yrs,
            'victims_between_1418_yrs': victims_between_1418_yrs,
            'victims_of_rape_total': victims_of_rape_total
        })

    task_instance.xcom_push(key='transformed_data', value=transformed_data)

    return transformed_data


def calculate_mean(task_instance):
    transformed_data = task_instance.xcom_pull(task_ids='transform_data', key='transformed_data')

    groups = set([row['subgroup'] for row in transformed_data])
    means_by_group = {}

    for group in groups:
        rape_cases = [row['rape_cases_reported'] for row in transformed_data if row['subgroup'] == group and row['rape_cases_reported'] is not None]
        mean = np.mean(rape_cases)
        means_by_group[group] = mean

    task_instance.xcom_push(key='means_by_group', value=means_by_group)

    return means_by_group


def load_data(task_instance):
    transformed_data = task_instance.xcom_pull(task_ids='transform_data', key='transformed_data')
    means_by_group = task_instance.xcom_pull(task_ids='calculate_mean', key='means_by_group')

    conn = psycopg2.connect(
        host='postgres-container',
        port='5432',
        user='airflow',
        password='airflow',
        database='nath'
    )

    cursor = conn.cursor()
    table_name = 'loaded_data'

    # Crear la tabla si no existe
    create_table_query = '''
        CREATE TABLE IF NOT EXISTS {table_name} (
            area_Name TEXT,
            year INTEGER,
            subgroup TEXT,
            rape_cases_reported INTEGER,
            victims_between_1014_yrs INTEGER,
            victims_between_1418_yrs INTEGER,
            victims_of_rape_total INTEGER,
            mean_rape_cases FLOAT
        );
    '''.format(table_name=table_name)
    cursor.execute(create_table_query)

    # Insertar los datos en la tabla
    insert_query = sql.SQL('''
        INSERT INTO {table_name} (area_Name, year, subgroup, rape_cases_reported,
                                  victims_between_1014_yrs, victims_between_1418_yrs,
                                  victims_of_rape_total, mean_rape_cases)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
    ''').format(table_name=sql.Identifier(table_name))

    for row in transformed_data:
        group = row['subgroup']
        mean = means_by_group.get(group, None)

        values = (row['area_Name'], row['year'], row['subgroup'], row['rape_cases_reported'],
                  row['victims_between_1014_yrs'], row['victims_between_1418_yrs'],
                  row['victims_of_rape_total'], mean)
        cursor.execute(insert_query, values)
        
    conn.commit()
    cursor.close()
    conn.close()


    
# def extract_dataLoaded():
#     conn = psycopg2.connect(
#         host='postgres-container',
#         port='5432',
#         user='airflow',
#         password='airflow',
#         database='nath'
#     )

#     cursor = conn.cursor()
#     query = """
#         SELECT area_name, year, subgroup, rape_cases_reported,
#                victims_between_1014_yrs, victims_between_1418_yrs,
#                victims_of_rape_total
#         FROM public.victims_of_rape
#     """
#     cursor.execute(query)
#     data = cursor.fetchall()
#     cursor.close()
#     conn.close()

#     return data

def segment_data(task_instance):
    data = task_instance.xcom_pull(task_ids='extract_data')

    # Seleccionar solo las columnas necesarias del resultado
    selected_data = [(row[0], row[1], row[2], row[6]) for row in data]

    df = pd.DataFrame(selected_data, columns=['area_name', 'year', 'subgroup', 'victims_of_rape_total'])

    # Segmentación para la columna "Assam"
    assam_data = df[df['area_name'] == 'Assam'].head(50)

    # Segmentación para la columna "Mizoram"
    mizoram_data = df[df['area_name'] == 'Mizoram'].head(50)

    # Concatenar los resultados de segmentación
    segmented_data = pd.concat([assam_data, mizoram_data])

    # Convertir los datos segmentados en una lista de diccionarios
    transformed_data = segmented_data.to_dict('records')

    task_instance.xcom_push(key='segmented_data', value=transformed_data)

    return transformed_data


def load_segmented_data(task_instance):
    transformed_data = task_instance.xcom_pull(task_ids='segment_data')

    conn = psycopg2.connect(
        host='postgres-container',
        port='5432',
        user='airflow',
        password='airflow',
        database='nath'
    )

    cursor = conn.cursor()
    table_name = 'segmented_data'

    # Crear la tabla si no existe
    create_table_query = '''
        CREATE TABLE IF NOT EXISTS {table_name} (
            area_Name TEXT,
            year INTEGER,
            subgroup TEXT,
            victims_of_rape_total INTEGER
        );
    '''.format(table_name=table_name)
    cursor.execute(create_table_query)

    # Insertar los datos segmentados en la tabla
    insert_query = sql.SQL('''
        INSERT INTO {table_name} (area_Name, year, subgroup,
                                  victims_of_rape_total)
        VALUES (%s, %s, %s, %s);
    ''').format(table_name=sql.Identifier(table_name))

    for row in transformed_data:
        values = (row['area_name'], row['year'], row['subgroup'],
                  row['victims_of_rape_total'])
        cursor.execute(insert_query, values)

    conn.commit()
    cursor.close()
    conn.close()


default_args = {
    'owner': 'airflow',
    'start_date': datetime(2023, 7, 7)
}

dag = DAG(
    'etl_dag5',
    default_args=default_args,
    description='DAG for ETL process',
    schedule_interval=None
)

extract_task = PythonOperator(
    task_id='extract_data',
    python_callable=extract_data,
    dag=dag
)

transform_task = PythonOperator(
    task_id='transform_data',
    python_callable=transform_data,
    provide_context=True,
    dag=dag
)

mean_task = PythonOperator(
    task_id='calculate_mean',
    python_callable=calculate_mean,
    provide_context=True,
    dag=dag
)

load_task = PythonOperator(
    task_id='load_data',
    python_callable=load_data,
    provide_context=True,
    dag=dag
)

segment_task = PythonOperator(
    task_id='segment_data',
    python_callable=segment_data,
    provide_context=True,
    dag=dag
)

load_segment_task = PythonOperator(
    task_id='load_segmented_data',
    python_callable=load_segmented_data,
    provide_context=True,
    dag=dag
)

# Configurar las dependencias de las tareas
extract_task >> transform_task >> mean_task >> load_task
extract_task >> segment_task >> load_segment_task
