from app.payments import payments_blueprint
from app.goals import goals_blueprint
from app.insights import insights_blueprint
from app.recommendations import recommendations_blueprint
from app.expenditures import expenditures_blueprint
from flask import Flask, render_template, request, g, jsonify
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


class InvalidContentTypeError(Exception):
    pass


class NoDataProvidedError(Exception):
    pass


class UnauthorizedClientError(Exception):
    pass


def verify_id_token(id_token):
    try:
        decoded_token = auth.verify_id_token(id_token, app=firebase_app)
        return decoded_token
    except Exception as e:
        print(e)
        raise UnauthorizedClientError()


@app.before_request
def check_user():
    if request.method == "POST":
        if request.content_type != 'application/json':
            raise InvalidContentTypeError()

        data = request.get_json()
        if not data:
            raise NoDataProvidedError()

        g.data = data

        id_token = request.authorization.token if request.authorization else None
        print(id_token)
        g.token = verify_id_token(id_token)

    if request.method == "GET":
        id_token = request.authorization.token if request.authorization else None
        g.token = verify_id_token(id_token)


@app.errorhandler(InvalidContentTypeError)
def handle_invalid_content_type_error(error):
    response = jsonify({"error": "Invalid Content-Type"})
    response.status_code = 400
    return response


@app.errorhandler(NoDataProvidedError)
def handle_no_data_provided_error(error):
    response = jsonify({"error": "No data provided"})
    response.status_code = 400
    return response


@app.errorhandler(UnauthorizedClientError)
def handle_verification_error(error):
    response = jsonify(
        {"error": "You are not authorized to access this resource"})
    response.status_code = 401
    return response


@app.errorhandler(404)
def handle_not_found_error(error):
    response = jsonify(
        {"error": "Could not find the resource you are trying to access"})
    response.status_code = 404
    return response


@app.errorhandler(500)
def handle_internal_server_error(error):
    response = jsonify(
        {"error": "There is an internal server error, try back later"})
    response.status_code = 500
    return response


@app.route("/")
def home():
    response = jsonify({"message": "API up",
                        "action": "Go to /docs for documentation"})
    response.status_code = 200
    return response


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
