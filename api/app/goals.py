from flask import Blueprint

goals_blueprint = Blueprint('goals', __name__)

@goals_blueprint.route('/', methods=['POST','GET'])
def goals():
    return "goals"