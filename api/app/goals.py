from flask import Blueprint, request, g
from firebase import db

goals_blueprint = Blueprint('goals', __name__)


@goals_blueprint.route('/', methods=['POST', 'GET'])
def goals():
    uid = g.token["uid"]
    goals_collection_ref = db.collection(
        "data").document(uid).collection("goals")

    if request.method == "POST":
        data = g.data
        update_time, goal_ref = goals_collection_ref.add(data)
        return {"data": data, "id": goal_ref.id}

    elif request.method == "GET":
        data = []
        goals = goals_collection_ref.stream()
        if not goals:
            return {"goals": {}}, 204

        for goal in goals:
            data.append({"data": goal.to_dict(), "id": goal.id})
        return data, 200
