from flask import Flask, Blueprint, request, g, jsonify

expenditures_blueprint = Blueprint('expenditures', __name__)


@expenditures_blueprint.route('/', methods=['POST', 'GET'])
def expenditures():
    if request.method == "POST":
        request.authorization
        data = request.get_json()
        uid = g.token["uid"]
        return {"message": "received", "payload": data}, 200
