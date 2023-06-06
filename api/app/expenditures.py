from flask import Blueprint, request, g, jsonify
from firebase import db

expenditures_blueprint = Blueprint('expenditures', __name__)


@expenditures_blueprint.route('/', methods=['POST', 'GET'])
def expenditures():
    uid = g.token["uid"]
    expenditures_collection_ref = db.collection(
        'expenditures').document(uid).collection('expenditures')

    if request.method == "POST":
        data = g.data
        update_time, expenditure_ref = expenditures_collection_ref.add(data)

        return {"data": data, "id": expenditure_ref.id}, 200

    elif request.method == "GET":
        data = []
        expenditures = expenditures_collection_ref.stream()
        if not expenditures:
            return {"expenditures": {}}, 204

        for entry in expenditures:
            data.append({"data": entry.to_dict(), "id": entry.id})
        return {"expenditures": data}, 200


@expenditures_blueprint.route('/<expenditure_id>', methods=['GET', 'PUT', 'DELETE'])
def expenditure(expenditure_id):
    uid = g.token["uid"]
    expenditure_doc_ref = db.collection(
        'expenditures').document(uid).collection('expenditures').document(expenditure_id)

    if request.method == "GET":
        data = expenditure_doc_ref.get()
        if not data.exists:
            return {"expenditure": {}}, 204
        return {"expenditure": {"data": data.to_dict(), "id": data.id}}, 200

    elif request.method == "PUT":
        data = g.data
        expenditure_doc_ref.update(data)
        return {"data": expenditure_doc_ref.get().to_dict(), "id": expenditure_doc_ref.get().id}, 200

    elif request.method == "DELETE":
        expenditure_doc_ref.delete()
        return {}, 200
