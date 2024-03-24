"""Toutes les requêtes liées à la Table Pays seront implanter ici sous forme de méthode"""
from utilitaire import *
class ReqPays:

    def __init__(self, db: ApplicationDB):
        self.db = db

    def get_pays(self):
        table = self.db.get_all_element('Pays')
        pays = []

        for row in table:
            pays.append({
                'id': row[0],
                'nom': row[1],
                'region': row[2],
                'devise': row[3],
                })

        return pays

    #Va être grandement utile pour la page d'un pays en particulier
    def get_pays_info(self, id):
        #besoin de requête pour
        table = self.db.get_element_by_id('Pays', id)
        paysInfo = {}
        publications = []       #méthode de récupération des publications lié au pays

        for row in table:
            paysInfo['name'] = row[1]
            paysInfo['region'] = row[2]
            paysInfo['devise'] = row[3]
            paysInfo['publications'] = publications
