""""Module dans lequel les class et fonctions utile sont présente
(Peut-être utiliser une classe d'utilisation)
"""

import bcrypt, hashlib, secrets, os, pymysql
from dotenv import load_dotenv
from Exception import *

load_dotenv()
class ApplicationDB:
#---------------------------- Fonction générale ----------------------------

    def __init__(self):
        self.db = pymysql.connect(
            host=os.environ.get('HOST'),
            user= os.environ.get('USER'),
            password=os.environ.get('PASSWORD'),
            db=os.environ.get('DATABASE'),
            port=int(os.environ.get('PORT')),
            autocommit=True
        )
        self.cursor = self.db.cursor()
        self.util = Utilitaire()

    def get_element_by_id(self, table: str, id):
        """Le Id peut être le nom, l'identifiant, l'email"""
        cmd = ""
        if table == "Pays":
            cmd = f"SELECT * FROM {table} WHERE id='{id}' OR nom '{id}'"
        if table == "Compagnons":
            cmd = f"SELECT * FROM {table} WHERE id='{id}' OR email='{id}"
        if table == "Publications":
            cmd = f"SELECT * FROM {table} WHERE id='{id}"

        self.cursor.execute(cmd)
        element = self.cursor.fetchall()

        return element

    def get_all_element(self, table:str):
        cmd = f"SELECT * FROM {table}"
        self.cursor.execute(cmd)

        element = self.cursor.fetchall()

        return element

    def useRoutine(self, type: str, routine, *args):
        if type == "F":
            # Construction de la requête SQL pour une fonction
            cmd = f"SELECT {routine}({', '.join(['%s' for _ in args])})"
        elif type == "P":
            # Construction de la requête SQL pour une procédure
            cmd = f"CALL {routine}({', '.join(['%s' for _ in args])})"

        self.cursor.execute(cmd)
        resultat = self.cursor.fetchall()

        return resultat
#---------------------------- Fin Fonction générale ----------------------------

#---------------------------- Fonction spécifique à une partie du code----------------------------

    def inscrireCompagnon(self, username, nom, prenom, courriel, password):
        #Toute les instance vide sont traités avec le server flask
        if (not self.util.validationMail(courriel)):
            raise PreconditionException("Le courriel est invalide")
        if (not self.util.validationPassword(password)):
            raise PreconditionException("Le mot de passe doit contenir les éléments identifiés")
        if (self.compagnon_existe(username, courriel)):
            raise PersonneDejaMembreException

        if  (self.compagnon_existe(username, courriel) == False):

            cmd = f"INSERT INTO Compagnons (username, nom, prenom, email, password) VALUES('{username}', '{nom}','{prenom}', '{courriel}', '{self.util.crypt(password)}')"
            self.cursor.execute(cmd)
            return {'success': True, 'message': 'Inscription réussie'}

    def connecterCompagnon(self, identifiant):
        if self.personne_membre(identifiant):
            cmd = f"SELECT * FROM Compagnons WHERE username='{identifiant}' OR email='{identifiant}'"
            self.cursor.execute(cmd)
            infos = self.cursor.fetchone()
            return infos

        else:
            raise PersonneIntrouvableException

    def personne_membre(self, identifiant):
        cmd = f"SELECT COUNT(*) FROM Compagnons WHERE username='{identifiant}' OR email='{identifiant}'"
        self.cursor.execute(cmd)
        count = self.cursor.fetchone()[0]
        return count == 1

    def compagnon_existe(self, username, email):
        # Vérifie si le nom d'utilisateur existe déjà dans la base de données
        sql = f"SELECT COUNT(*) FROM Compagnons WHERE username = '{username}' OR email='{email}'"
        self.cursor.execute(sql)
        count = self.cursor.fetchone()[0]
        return count > 0

    #Implanter les différentes méthodes de requêtes ici!

class GestionSession:
    def __init__(self):
        self._data = {}

    def getUsername(self, sessionId):
        return self._data.get(sessionId)

    def createSession(self, username):
        token = self.generate_token()
        self._data[token] = username
        return token

    def deleteSession(self, session_id):
        del self._data[session_id]

    def generate_token(self):
        return secrets.token_hex(16)


class Utilitaire:
    def __init__(self):
        self.__salt = b'$2b$12$m/F3kIXkAhsccIvucBJu7.'

    def crypt(self, mdp: str):
        """

        Fonction cryptant le mot de passe passées en argument

        Args:
            mdp: Le mot de passe passée en argument

        Returns:
            str: La version crypté du mot de passe 

        """
        bytes = mdp.encode('utf-8')

        hashValue = (str(bcrypt.hashpw(bytes, self.__salt)).encode())
        newmdp = hashlib.sha256(hashValue).hexdigest()[:50]

        return newmdp

    def validationMail(self, email):
        #We know its some of them doesnt exist but for this project we assumed they do!
        email_services = ["gmail", "yahoo", "outlook", "hotmail","aol", "icloud", "yandex", "protonmail", "zoho", "mail", "gmx", "live"]
        domain_extensions = [".com", ".net", ".org", ".edu", ".gov", ".fr", ".uk", ".ca", ".au", ".de", ".in"]

        email_domains = [service + extension for service in email_services for extension in domain_extensions]

        _, newEmail = email.split("@")
        # print(newEmail)

        validation = True
        if newEmail not in email_domains:
            validation = False

        return validation

    def validationPassword(self, mdp):
        numCount, lettreCount, specialCount = 0, 0, 0
        speciaux = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', '|', '\\', ';', ':', "'", '"', ',', '.', '/']

        for char in mdp:
            if char.isalpha():
                lettreCount += 1
            if char.isdigit():
                numCount += 1
            if char in speciaux:
                specialCount += 1

        validation = len(mdp) >= 8 and lettreCount >= 1 and numCount >= 1 and specialCount >= 1

        return validation




# util = Utilitaire()
# validation = util.validationMail("yyapi25@gmail.com")
# print(validation)

# validation2 = util.validationPassword("y454567@")
# print(validation2)

# mdp = util.crypt('Yaya454567@')
# print(mdp)
