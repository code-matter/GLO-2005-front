"""Modifier l'entierté du projet pour qu'il soit lié au"""


from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from utilitaire import *
import pymysql

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}}) #le ressources=... c'était pour voir avec postman c'est pas nécessaire

#Modifier pour qu'on puisse utiliser un environnement seulement
MDPSQL = "Yaya4545672513@"
connection = pymysql.connect(host='localhost', user='root', password=MDPSQL, db='siteGestion')
#--------------------------------------------------------------------#

cur = connection.cursor()


@app.route('/inscription', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'POST':
        data = request.json
        # Traitement des données ici
        # Exemple de traitement des données
        firstname = data['prenom']
        lastname = data['nom']
        username = data['username']
        email = data['email']
        mdp = crypt(data['password'])
        # Répondez avec un message de succès
        dicto = {
            'firstname': firstname,
            'lastname': lastname,
            'username': username,
            'email': email,
            'mdp': mdp
        }

        try:
            cmd = f"INSERT INTO membre VALUES('{dicto['firstname']}', '{dicto['lastname']}', '{dicto['username']}', '{dicto['email']}', '{dicto['mdp']}', '')"
            cur.execute(cmd)
            cmd2= f"INSERT INTO imageProfile (username, imagePath) SELECT username, image FROM membre WHERE username ='{dicto['username']}'"
            cur.execute(cmd2)
            connection.commit()
        except Exception as e:
            return jsonify(e)
        return jsonify(dicto)

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
        mdp = crypt(data['mdp'])        #peut-être pas nécessaire ---> allons-nous utiliser la véridifcation ici?

        cmd = f"SELECT username, motDePasse FROM membre WHERE username = '{identifiant}'"
        cur.execute(cmd)
        infos = cur.fetchone()

        #faire un try except avec une fonction de vérification des éléments

        verification = {
            'username': infos[0],
            'password': infos[1]
        }
        return jsonify(verification)

    elif request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response


if __name__ == '__main__':
    app.run(debug=True)
