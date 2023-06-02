from flask import Blueprint, request, g, jsonify
from firebase import db

expenditures_blueprint = Blueprint('expenditures', __name__)


@expenditures_blueprint.route('/', methods=['POST', 'GET'])
def expenditures():
    uid = g.token["uid"]
    expenditures_doc_ref = db.collection(
        'expenditures').document(uid).collection('expenditures')
    if request.method == "POST":
        data = g.data
        expenditures_doc_ref.add(data)

        return {"message": "document added", "data": data}, 200

    elif request.method == "GET":
        data = []
        expenditures = expenditures_doc_ref.stream()
        if not expenditures:
            return {"expenditures": {}}, 204

        for entry in expenditures:
            data.append({"data": entry.to_dict(), "id": entry.id})
        return {"expenditures": data}, 200
