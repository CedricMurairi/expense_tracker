from app.payments import payments_blueprint
from app.goals import goals_blueprint
from app.insights import insights_blueprint
from app.recommendations import recommendations_blueprint
from app.expenditures import expenditures_blueprint
from flask import Flask, render_template
from flask_cors import CORS
from firebase import db

app = Flask(__name__)
CORS(app)


app.register_blueprint(expenditures_blueprint, url_prefix="/expenditures")
app.register_blueprint(recommendations_blueprint,
                       url_prefix="/recommendations")
app.register_blueprint(insights_blueprint, url_prefix="/insights")
app.register_blueprint(goals_blueprint, url_prefix="/goals")
app.register_blueprint(payments_blueprint, url_prefix="/payments")
app.add_url_rule('/', endpoint='home')


# @app.before_request
# def check_user():
#     pass


@app.route("/")
def home():
    return {"message": "API up", "status": 200, "action": "Go to /docs for documentation"}


@app.route("/docs")
def docs():
    return render_template("docs.html")


@app.route("/firebase-test")
def firebase_test():
    res = {}
    ref = db.collection("users")
    docs = ref.stream()
    for doc in docs:
        res[doc.id] = doc.to_dict()
    return res


if __name__ == "__main__":
    app.run(debug=True)
