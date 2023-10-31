from flask import Blueprint, g
from app.helpers.recommendations import get_recommendations
from firebase import db
from datetime import datetime as dt

recommendations_blueprint = Blueprint('recommendations', __name__)


@recommendations_blueprint.route('/', methods=['GET'])
def recommendations():
    uid = g.token["uid"]
    date_format = "%m/%d/%Y, %I:%M:%S %p"

    expenditure_keys = [
        "Food Expenditure",
        "Restaurant and Hotels Expenditure",
        "Alcoholic Beverages Expenditure",
        "Tobacco Expenditure",
        "Clothing and Other Wear Expenditure",
        "Housing and Water Expenditure",
        "Medical Care Expenditure",
        "Transportation Expenditure",
        "Communication Expenditure",
        "Education and Learning Expenditure",
        "Miscellaneous Expenditure",
        "Special Occasions Expenditure",
        "Gardening Expenditure"]

    resulting_expenditures = {key: 0 for key in expenditure_keys}

    def date_object(date): return dt.strptime(date, date_format)

    current_month = dt.now().month

    expenditures_stream = db.collection("data").document(
        uid).collection("expenditures").where(
        "date", "<", dt.now().strftime("%m/%d/%Y, %I:%M:%S %p")).stream()

    past_month_expenditures = [expenditure.to_dict()
                               for expenditure in expenditures_stream]

    for expense in past_month_expenditures:
        category = expense['category']
        amount = int(expense['amount'])
        resulting_expenditures[category] = amount

    if resulting_expenditures == []:
        return {"message": "Not enough data to make recommendations"}, 404

    goals = db.collection("data").document(uid).collection("goals").stream()

    savings = 0

    for goal in goals:
        goal = goal.to_dict()
        if goal.get("installments"):
            savings += sum(payment["amount"] for payment in goal["payments"]
                           if not payment["paid"] and date_object(payment["paymentDue"]).month == current_month)
        else:
            savings += int(goal["amount"]) if not goal["paid"] and date_object(
                goal["paymentDue"]).month == current_month else 0

    income = db.collection("data").document(
        uid).collection("settings").document("income").get().to_dict() or None

    weights = db.collection("data").document(
        uid).collection("settings").document("weights").get().to_dict() or None

    if not income or not weights:
        return {"message": "Please set your income and weights in the settings page to get recommendations"}, 404

    return get_recommendations(resulting_expenditures, income["amount"], weights["weights"], savings)
