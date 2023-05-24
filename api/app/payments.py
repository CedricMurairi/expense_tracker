from flask import Blueprint

payments_blueprint = Blueprint('payments', __name__)

@payments_blueprint.route('/', methods=['POST','GET'])
def payments():
    return "payments"