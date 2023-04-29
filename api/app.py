import numpy as np
import pandas as pd
from flask import Flask, request, render_template
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

expenditures = ['Food Expenditure',
                'Restaurant and Hotels Expenditure',
                'Alcoholic Beverages Expenditure',
                'Tobacco Expenditure',
                'Clothing and Other Wear Expenditure',
                'Housing and Water Expenditure',
                'Medical Care Expenditure',
                'Transportation Expenditure',
                'Communication Expenditure',
                'Education and Learning Expenditure',
                'Miscellaneous Expenditure',
                'Special Occasions Expenditure',
                'Gardening Expenditure'
                ]


@app.route("/")
def hoome():
    return {"message": "API up", "status": 200, "action": "Go to /docs for documentation"}


@app.route("/docs")
def docs():
    return render_template("docs.html")


@app.route("/recommendation", methods=["POST"])
def recommend():
    if request.method == "POST":
        data = request.get_json()
    return get_recommendations(data)


def get_recommendations(data):
    '''
        The model predicts what the user can save based oon their spendings and recommends how much to cut 
        and on what to get closer to the desired saving goal.

        It suggests cutting down on expenditures to meet the saving goal if the goal cannot be met.
        Or suggest you up your spending or increase your saving goals if the goals is met and there is money left.
    '''

    recommendation = {}

    weights = data['weights']
    expenditures = data['expenditures']

    income = data['income']
    savings = data['savings']

    max_spending = {}
    for col in weights:
        max_spending[col] = (income - savings) * weights[col]

    user_df = pd.DataFrame.from_dict(
        {'Total Income': [income], **expenditures, 'Savings': [savings]})

    kmeans = joblib.load('../models/clustering_model.pkl')
    user_cluster = kmeans.predict(user_df.drop(['Savings'], axis=1))[0]

    model = joblib.load(f'../models/model_cluster_{user_cluster}.pkl')

    user_savings = model.predict(user_df.drop(['Savings'], axis=1))[0]

    savings_gap = savings - user_savings

    if savings >= user_savings:
        savings_cut = savings_gap / savings
        saving_cut_percent = round(savings_cut * 100, 2)
        recommendation['possible_savings'] = {
            'value': user_savings,
            'saving_cut_percent': saving_cut_percent,
            'messages': {
                0: f"With your current spending habits you can only save approximately {user_savings}, that's a {saving_cut_percent}% cut.",
                1: f"To meet the extra {savings_gap} please follow our recommendations."
            }
        }
    else:
        savings_increase = savings_gap / savings
        savings_increase_percent = round(savings_increase * 100, 2)
        recommendation['potential_savings'] = {
            'value': abs(round(savings_gap, 2)),
            'saving_increase_percent': abs(savings_increase_percent),
            'messages': {
                0: f"Based on your current spending habit you can up your saving goal by approximately {abs(savings_gap)} more, that's a {abs(savings_increase_percent)}% increase",
                1: "Or follow our recommendation on how you can allocate more to your expenditures."
            }
        }

    for col, expenditure in expenditures.items():
        if expenditure > 0:
            if expenditures[col] > max_spending[col]:
                overspending_reduction = (
                    expenditures[col] - max_spending[col]) / expenditures[col]

                overspending_details = {
                    'overspending_reduction_percent': round(overspending_reduction * 100, 2),
                    'spending_baseline': round(max_spending[col], 2),
                    'messages': {
                        0: f"You are overspending in {col} by {round(overspending_reduction * 100, 2)}%.",
                        1: f"You should reduce your spending on {col} to {round(max_spending[col], 2)}."
                    }
                }

                if recommendation.get('overspending'):
                    recommendation['overspending'][col] = overspending_details
                else:
                    recommendation['overspending'] = {
                        f"{col}": overspending_details
                    }

                continue

            elif expenditures[col] <= max_spending[col]:
                weight = weights[col]
                max_reduction = (user_savings - savings) * weight / expenditure
                reduction = min(max_reduction, 1.0)
                saved = round(reduction * expenditure, 2)

                if savings >= user_savings:
                    adjustment_details = {
                        'adjustment_percent': round(reduction * 100, 2),
                        'to_save': abs(round(saved, 2)),
                        'messages': {
                            0: f"You are within your budget on {col}.",
                            1: f"If you adjust your spending on {col} by {round(reduction * 100, 2)}%, you could save {abs(round(saved, 2))} more per month."
                        }
                    }

                    if recommendation.get('adjustment'):
                        recommendation['adjustment'][col] = adjustment_details
                    else:
                        recommendation['adjustment'] = {
                            f"{col}": adjustment_details
                        }
                else:
                    allocation_details = {
                        'allocation_percent': round(reduction * 100, 2),
                        'to_allocate': round(saved, 2),
                        'messages': {
                            0: f"You are within your budget on {col}. No spending cut needed.",
                            1: f"You could allocate {round(saved, 2)} more money on {col}, that's a {round(reduction * 100, 2)}% increase per month"
                        }
                    }

                    if recommendation.get('allocation'):
                        recommendation['allocation'][col] = allocation_details
                    else:
                        recommendation['allocation'] = {
                            f"{col}": allocation_details
                        }

    return recommendation


if __name__ == "__main__":
    app.run(debug=True)
