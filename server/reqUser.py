"""Module qui permet de gérer l'inscription, la connexion de l'utilisateur"""
from utilitaire import *
from Exception import *


class UserGestion:

    def __init__(self, db: ApplicationDB):
        #Connexion à la base de données
        self.db = db
        self.util = Utilitaire()

    def inscription(self, username, nom, prenom, email, password):
        verif = self.db.inscrireCompagnon(username, nom, prenom, email, password)
        return verif

    def connexion(self, identifiant, password):
        profile = {}
        infos = self.db.connecterCompagnon(identifiant)
        profile['password'] = infos[5]

        if profile['password'] == self.util.crypt(password):
            profile['username'] = infos[0]
            profile['nom'] = infos[1]
            profile['prenom'] = infos[2]
            profile['age'] = infos[3]
            profile ['email'] = infos[4]
            profile['bio'] = infos[6]
            profile['image'] = infos[7]
            profile['pays'] = infos[8]

        else:
            profile = None
            raise PersonneIntrouvableException('Le mot de passe est incorrecte')

        return profile

