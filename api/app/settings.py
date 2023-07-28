from flask import Blueprint, request, g
from firebase import db

settings_blueprint = Blueprint('settings', __name__)


@settings_blueprint.route('/', methods=['GET'])
def settings():
    uid = g.token["uid"]
    settings_doc_ref = db.collection(
        'data').document(uid).collection('settings')

    settings = {}
    settings_stream = settings_doc_ref.stream()
    for setting in settings_stream:
        settings[setting.id] = setting.to_dict()
    return settings, 200


@settings_blueprint.route('/income', methods=['GET', 'POST', 'PUT'])
def income():
    uid = g.token["uid"]
    data = g.data
    income_doc_ref = db.collection(
        'data').document(uid).collection('settings').document('income')
    if request.method == "POST":
        income_doc_ref.set(data)
        return {"income": data}, 200

    elif request.method == "PUT":
        income_doc_ref.update(data)
        return {"income": data}, 200


@settings_blueprint.route('/weights', methods=['GET', 'POST', 'PUT'])
def weights():
    uid = g.token["uid"]
    data = g.data
    weights_doc_ref = db.collection('data').document(
        uid).collection('settings').document('weights')
    if request.method == "POST":
        weights_doc_ref.set(data)
        return {"weights": data}, 200

    elif request.method == "PUT":
        weights_doc_ref.update(data)
        return {"weights": data}, 200
