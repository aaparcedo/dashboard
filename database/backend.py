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
    #todo change string size
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    phone = db.Column(db.String(200), nullable=False, unique=True)
    access = db.Column(db.String(200), nullable=False,)


    def __repr__(self):
        return f"client(name = {self.name}, email = {self.email}, age = {self.age}, phone = {self.phone}, access = " \
               f"{self.access})"

db.create_all()# Creates database and tables


client_put_args = reqparse.RequestParser()
client_put_args.add_argument("name", type=str, help="Add client name", required=True)
client_put_args.add_argument("email", type=str, help="Add email", required=True)
client_put_args.add_argument("age", type=int, help="Add age", required=True)
client_put_args.add_argument("phone", type=str, help="Add phone number", required=True)
client_put_args.add_argument("access", type=str, help="Add access level", required=True)

client_patch_args = reqparse.RequestParser()
client_patch_args.add_argument("name", type=str, help="Add client name", required=True)
client_patch_args.add_argument("email", type=str, help="Add email", required=True)
client_patch_args.add_argument("age", type=int, help="Add age", required=True)
client_patch_args.add_argument("phone", type=str, help="Add phone number", required=True)
client_patch_args.add_argument("access", type=str, help="Add access level", required=True)

resource_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'email': fields.String,
    'age': fields.Integer,
    'phone': fields.String,
    'access': fields.String,
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

        client = ClientModel(id=client_id, name=args['name'], email=args['email'], age=args['age'], phone=args['phone'],
                             access=args['access'])
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
        if args['email']:
            result.email = args['email']
        if args['age']:
            result.age = args['age']
        if args['phone']:
            result.phone = args['phone']
        if args['access']:
            result.access = args['access']

        db.session.commit()

        return result, 202

    def delete(self, client_id):
        client_to_delete = ClientModel.query.filter_by(id=client_id).first()
        if not client_to_delete:
            abort(404, message="client id not found...")

        db.session.delete(client_to_delete)
        db.session.commit()
        return 200



api.add_resource(client, "/client/<int:client_id>")
if __name__ == "__main__":
    app.run(debug=True)
