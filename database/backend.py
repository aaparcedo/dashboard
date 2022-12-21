from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
import requests



app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
BASE = "http://127.0.0.1:5000/"

class ClientModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f"client(name = {self.name})"

# db.create_all() Creates database and tables


client_put_args = reqparse.RequestParser()
client_put_args.add_argument("name", type=str, help="Add client name", required=True)

client_patch_args = reqparse.RequestParser()
client_patch_args.add_argument("name", type=str, help="Add client name", required=True)


resource_fields = {
    'id': fields.Integer,
    'name': fields.String,
}


class client(Resource):
    @marshal_with(resource_fields)
    def get(self, client_id):
        result = ClientModel.query.filter_by(id=client_id).first()
        if not result:
            abort(404, message="Unable to locate client with that id")
        return result, 200

    @marshal_with(resource_fields)
    def put(self, client_id):
        args = client_put_args.parse_args()
        result = ClientModel.query.filter_by(id=client_id).first()
        if result:
            abort(409, message="client id already in use")

        client = ClientModel(id=client_id, name=args['name'])
        db.session.add(client)
        db.session.commit()
        return client, 201

    @marshal_with(resource_fields)
    def patch(self, client_id):
        args = client_patch_args.parse_args()
        result = ClientModel.query.filter_by(id=client_id).first()
        if not result:
            abort(404, message="client is not in database")

        if args['name']:
            result.name = args['name']

        db.session.commit()

        return result, 202

    def delete(self, client_id):
        client_to_delete = ClientModel.query.filter_by(id=client_id).first()
        if not client_to_delete:
            abort(404, message="client id not found...")

        db.session.delete(client_to_delete)
        db.session.commit()
        return 200


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

def create_test_case(id):
    data = {"name": "test", "type": "test", "author": "test test", "page_count": 1, "genre": "test",
            "progress": "test"}
    response = requests.put(BASE + "client/" + str(id), data)

api.add_resource(client, "/client/<int:client_id>")
if __name__ == "__main__":
    app.run(debug=True)
