import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template
import joblib

app = Flask(__name__)

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
    user_data = [1, 1, 1]
    features = [np.array(user_data)]
    recommendations = get_recommendations(features)

    return render_template("index.html", recommendation_result=recommendations)


def get_recommendations(data):
    '''
        The model predicts what the user can save based oon their spendings and recommends how much to cut 
        and on what to get closer to the desired saving goal.

        It suggests cutting down on expenditures to meet the saving goal if the goal cannot be met.
        Or suggest you up your spending or increase your saving goals if the goals is met and there is money left.
    '''

    recommendation = {}

    # Expenditure weights
    # weights = {'Food Expenditure': 0.2,
    #            'Restaurant and Hotels Expenditure': 0.05,
    #            'Alcoholic Beverages Expenditure': 0.01,
    #            'Tobacco Expenditure': 0.01,
    #            'Clothing and Other Wear Expenditure': 0.04,
    #            'Housing and Water Expenditure': 0.3,
    #            'Medical Care Expenditure': 0.05,
    #            'Transportation Expenditure': 0.05,
    #            'Communication Expenditure': 0.1,
    #            'Education and Learning Expenditure': 0.1,
    #            'Miscellaneous Expenditure': 0.05,
    #            'Special Occasions Expenditure': 0.04,
    #            'Gardening Expenditure': 0.01
    #            }

    weights = data['weights']
    expenditures = data['expenditures']

    income = data['income']
    savings = data['savings']

    # Calculate maximum spending in each category based on income and weights
    max_spending = {}
    for col in weights:
        max_spending[col] = (income - savings) * weights[col]

    # Create a DataFrame from the user input
    user_df = pd.DataFrame.from_dict(
        {'Total Income': [income], **expenditures, 'Savings': [savings]})

    # Determine the cluster of the user
    kmeans = joblib.load('clustering_model.pkl')
    user_cluster = kmeans.predict(user_df.drop(['Savings'], axis=1))[0]

    model = joblib.load(f'model_cluster_{user_cluster}.pkl')

    user_savings = model.predict(user_df.drop(['Savings'], axis=1))[0]

    savings_gap = savings - user_savings

    if savings >= user_savings:
        savings_cut = savings_gap / savings
        saving_cut_percent = round(savings_cut * 100, 2)
        recommendation['possible_savings'] = {
            'value': user_savings,
            'saving_cut_percent': saving_cut_percent,
            'message': {
                0: f"""
                        With your current spending habits you can only save approximately {user_savings}, that's a {saving_cut_percent}% cut.
                    """,
                1: f"To meet the extra {savings_gap} please follow our recommendations."
            }
        }
    else:
        savings_increase = savings_gap / savings
        savings_increase_percent = round(savings_increase * 100, 2)
        recommendation['potential_savings'] = {
            'value': savings_gap,
            'saving_cut_percent': savings_increase_percent,
            'message': {
                0: f"""
                        Based on your current spending habit you can up your saving goal by approximately {abs(savings_gap)} more, that's a {savings_increase_percent}% increase
                    """,
                1: "Or follow our recommendation on how you can allocate more to your expenditures."
            }
        }

    for col, expenditure in expenditures.items():
        if expenditure > 0:
            if expenditures[col] > max_spending[col]:
                overspending_reduction = (
                    expenditures[col] - max_spending[col]) / expenditures[col]
                if len(recommendation['overspending']) > 0:
                    recommendation['overspending'][col] = {
                        'overspending_reduction': overspending_reduction,
                        'overspending_reduction_percent': round(overspending_reduction * 100, 2),
                        'spending_baseline': max_spending[col],
                    }
                else:
                    recommendation['overspending'] = {
                        f"{col}": {
                            
                        },
                    }
                print(f"You are overspending in {col} by {round(overspending_reduction * 100, 2)}%. "
                      f"You should reduce your spending on {col} to {round(max_spending[col], 2)}.")
                continue
            elif expenditures[col] <= max_spending[col]:
                print(
                    f"You are within your budget on {col}. No spending cuts needed.")
                weight = weights[col]
                max_reduction = (user_savings - savings) * weight / expenditure
                reduction = min(max_reduction, 1.0)
                saved = round(reduction * expenditure, 2)
                if savings >= user_savings:
                    print(
                        f"If you adjust your spending on {col} by {round(reduction * 100, 2)}%, you could save {abs(saved)} more per month.")
                else:
                    print(
                        f"You could allocate {saved} more money on {col}, that's a {round(reduction * 100, 2)}% increase per month")


if __name__ == "__main__":
    app.run(debug=True)
