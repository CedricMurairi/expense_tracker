from app.payments import payments_blueprint
from app.goals import goals_blueprint
from app.insights import insights_blueprint
from app.recommendations import recommendations_blueprint
from app.expenditures import expenditures_blueprint
from flask import Flask, render_template, request, g
from flask_cors import CORS
from firebase import db
from firebase import app as firebase_app
from firebase_admin import auth

app = Flask(__name__)
CORS(app)


app.register_blueprint(expenditures_blueprint, url_prefix="/expenditures")
app.register_blueprint(recommendations_blueprint,
                       url_prefix="/recommendations")
app.register_blueprint(insights_blueprint, url_prefix="/insights")
app.register_blueprint(goals_blueprint, url_prefix="/goals")
app.register_blueprint(payments_blueprint, url_prefix="/payments")
app.add_url_rule('/', endpoint='home')


@app.before_request
def check_user():
    if request.method == "GET":
        pass
    if request.content_type != 'application/json':
        return {"error": "Invalid Content-Type"}
    data = request.get_json()
    if data is None or data == {}:
        return {"error": "No data provided"}

    try:
        id_token = request.authorization.token
        decoded_token = auth.verify_id_token(id_token, app=firebase_app)
        g.token = decoded_token
    except Exception as e:
        print(e)


@app.route("/")
def home():
    return {"message": "API up", "action": "Go to /docs for documentation"}, 200


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
