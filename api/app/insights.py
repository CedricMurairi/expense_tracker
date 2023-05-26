from flask import Blueprint

insights_blueprint = Blueprint('insights', __name__)

@insights_blueprint.route('/', methods=['POST','GET'])
def insights():
    return "insights"