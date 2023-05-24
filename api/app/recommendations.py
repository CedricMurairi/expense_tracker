from flask import Blueprint, request
from app.helpers.recommendations import get_recommendations

recommendations_blueprint = Blueprint('recommendations', __name__)


@recommendations_blueprint.route('/', methods=['POST'])
def recommendations():
    if request.content_type != 'application/json':
        return {"error": "Invalid Content-Type"}
    data = request.get_json()
    if data is None or data == {}:
        return {"error": "No data provided"}
    return get_recommendations(data)
