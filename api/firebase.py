import os
import firebase_admin
from firebase_admin import firestore, credentials

cred = credentials.Certificate(
    os.environ.get("GOOGLE_APPLICATION_CREDENTIALS"))
app = firebase_admin.initialize_app(cred)
db = firestore.client(app)
