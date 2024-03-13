from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pymysql 


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}}) #le ressources=... c'était pour voir avec postman c'est pas nécessaire

MDPSQL = "Yaya4545672513@"
connection = pymysql.connect(host='localhost', user='root', password=MDPSQL, db='siteGestion')
cur = connection.cursor()

from flask import jsonify, make_response

@app.route('/Register', methods=['GET', 'POST', 'OPTIONS'])
def register():
    if request.method == 'POST':
        data = request.json
        # Traitement des données ici
        # Exemple de traitement des données
        firstname = data['firstname']
        lastname = data['lastname']
        username = data['username']
        email = data['email']
        mdp = data['mdp']
        cmdp = data['cmdp']
        # Répondez avec un message de succès
        dicto = {
            'firstname': firstname,
            'lastname': lastname,
            'username': username,
            'email': email,
            'mdp': mdp,
            'cmdp': cmdp
        }

        print(dicto)

        try:
            cmd = f"INSERT INTO membre VALUES('{dicto['firstname']}', '{dicto['lastname']}', '{dicto['username']}', '{dicto['email']}', '{dicto['mdp']}', '')"
            cur.execute(cmd)
            cmd2= f"INSERT INTO imageProfile (username, imagePath) SELECT username, image FROM membre WHERE username ='{dicto['username']}'"
            cur.execute(cmd2)
            connection.commit()
        except Exception as e:
            print(e)
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

if __name__ == '__main__':
    app.run(debug=True)
