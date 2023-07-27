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


@goals_blueprint.route('/<goal_id>', methods=['PUT'])
async def update_goal(goal_id):
    uid = g.token["uid"]
    data = g.data
    goals_collection_ref = db.collection(
        "data").document(uid).collection("goals")
    goal_ref = goals_collection_ref.document(goal_id)

    if data["is_installment"]:
        await goal_ref.update({
            f"payments.{data['installmentNumber']}.paid": data['paid'],
            f"payments.{data['installmentNumber']}.paymentDate": data['paymentDate']
        })
    else:
        await goal_ref.update({
            "paid": data['paid'],
            "paymentDate": data['paymentDate']
        })

    return {"data": data, "id": goal_ref.id}
