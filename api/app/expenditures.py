from flask import Flask, Blueprint

expenditures_blueprint = Blueprint('expenditures', __name__)

@expenditures_blueprint.route('/', methods=['POST','GET'])
def expenditures():
    return "Expenditures"