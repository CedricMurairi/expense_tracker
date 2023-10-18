from flask import Blueprint, g
from app.helpers.recommendations import get_recommendations
from firebase import db
from datetime import datetime as dt
from google.cloud.firestore_v1.base_query import FieldFilter

recommendations_blueprint = Blueprint('recommendations', __name__)


@recommendations_blueprint.route('/', methods=['GET'])
def recommendations():
    uid = g.token["uid"]
    current_month = dt.now().month

    expenditures = db.collection("data").document(
        uid).collection("expenditures")

    past_month_expenditures = expenditures.where(
        "date", "<", dt.now().strftime("%m/%d/%Y, %I:%M:%S %p")).where("date", ">", dt.now().replace(month=current_month - 2)).stream()

    # if past_month_expenditures.size() == 0:
    #     return "Not enough data in the last data to make recommendations"

    goals = db.collection("data").document(uid).collection("goals").stream()

    planned_savings = goals

    income = db.collection("data").document(
        uid).collection("settings").document("income").get().to_dict() or {}

    weights = db.collection("data").document(
        uid).collection("settings").document("weights").get().to_dict() or {}

    # if not income or not weights:
    #     return "Please set your income and weights in the settings page to get recommendations"

    return get_recommendations({"expenditures": [expenditure.to_dict() for expenditure in past_month_expenditures], "income": income, "weights": weights, "goals": goals})
