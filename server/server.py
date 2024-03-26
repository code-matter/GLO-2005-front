"""Modifier l'entierté du projet pour qu'il soit lié au"""


from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from utilitaire import *
from reqUser import *
from reqPublication import *
from reqPays import *

import pymysql

app = Flask(__name__)
cors = CORS(app)#, resources={r"/api/*": {"origins": "*"}}) #le ressources=... c'était pour voir avec postman c'est pas nécessaire

#Modifier pour qu'on puisse utiliser un environnement seulement

#je ne sais pas comment gérer les sessions pour l'instant donc:
active = {}

@app.route('/inscription', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'POST':
        data = request.json
        # Traitement des données ici
        # Exemple de traitement des données
        prenom = data['prenom']
        nom = data['nom']
        username = data['username']
        email = data['email']
        password = data['password']
        error = []

        # Répondez avec un message de succès
        try:
            verif = reqUser.inscription(username, nom, prenom, email, password)
            return jsonify(verif)

        except PersonneDejaMembreException as e:
            print(e.message)
            error.append(e.message)

        except PreconditionException as e:
            error.append(e.message)

        print(error)
        return jsonify({'error': error}), 409

    elif request.method == 'OPTIONS':
        # Répondre aux requêtes OPTIONS avec les en-têtes CORS appropriés
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

    # elif request.method == 'GET':
    #     return 'GET request received'

@app.route("/connexion", methods=["GET", "POST",'OPTIONS'])
def login():
    if request.method == 'POST':
        data = request.json
        identifiant = data['identifiant']
        mdp = data['password']       #peut-être pas nécessaire ---> allons-nous utiliser la véridifcation ici?

        try:
            membre = reqUser.connexion(identifiant, mdp)
            if membre:
                sessionId = session.createSession(identifiant)
                res = make_response(jsonify(membre))
                res.set_cookie('sessionId', sessionId)

                return jsonify(membre)

        except PersonneIntrouvableException as e:
            print(e)
            return jsonify({'error': e.message}), 401

    elif request.method == 'GET':
        data = request.json
        identifiant = data['identifiant']
        mdp = data['password']
        membre = reqUser.connexion(identifiant, mdp)
        return jsonify(membre)

    elif request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

@app.route("/:username", methods=["GET", "POST", "OPTIONS"])
def profile():
    
    if request.method == 'POST':
        data = request.json
        print(data)
        return jsonify(data)

    elif request.method == 'GET':
        data = request.json
        print(data[0])
        #Faire les requêtes qui prennent les information sur cette page là.
        # cmd = f"SELECT * FROM Compagnons WHERE username='{user}';"
        # db.cursor.execute(cmd)
        # infos = db.cursor.fetchone()

        # dicto = {
        #     "username": infos[0],
        #     "nom": infos[1],
        #     "prenom": infos[2]
        # }

        return data

    elif request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response

@app.route("/compagnons", methods=["GET", "POST", "OPTIONS"])
def compagnons():
    return jsonify({"content":"pageCompagnons"})

@app.route("/compagnons/<username>", methods=["GET", "POST", "OPTIONS"])
def compagnonsId():
    return jsonify({"content":"pageCompagnon"})

@app.route("/publications/<int:publicationId>", methods=["GET", "POST", "OPTIONS"])
def publications():
    return jsonify({"content":"pagePublications"})

@app.route("/pays/<int:paysId>", methods=["GET", "POST", "OPTIONS"])
def pays():
    return jsonify({"content":"pagePays"})

if __name__ == '__main__':
    db = ApplicationDB()
    util = Utilitaire()
    reqUser = UserGestion(db)
    session = GestionSession()
    app.run(debug=True)
