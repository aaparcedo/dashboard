import requests
import pandas as pd

BASE = "http://127.0.0.1:5000/"

def excel_to_db():
    excel_file_path = "data.xlsx"
    df = pd.read_excel(excel_file_path)
    BASE = "http://127.0.0.1:5000/"
    for i in range(len(df.values)): #todo change values
        data = {"name": df.values[i][1],
                "email": df.values[i][2],
                "age": df.values[i][3],
                "phone": df.values[i][4],
                "access": df.values[i][5],
                }

        response = requests.put(BASE + "book/" + str(i), data)
        print(response.json())

def create(id, data):
    response = requests.put(BASE + "client/" + id, data)
    return response


def read(id):
    response = requests.get(BASE + "client/" + id)
    print(response.content)
    return response


def update(id, data):
    response = requests.patch(BASE + "client/" + id, data)
    return response


def delete_(id):
    response = requests.delete(BASE + "client/" + str(id))
    return response


def delete_range(start_id, end_id):
    for i in range(start_id, end_id + 1):
        requests.delete(BASE + "client/" + str(i))

#creats dummy test case
def create_test_case(id):
    data = {"name": "test", "email": "test@email.com", "age": 20, "phone": "555-555-5555", "access": "your mother"}
    response = requests.put(BASE + "client/" + str(id), data)
    print(response.json())

create_test_case(1)



