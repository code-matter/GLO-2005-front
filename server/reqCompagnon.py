"""Toutes les requêtes liées à la Table compagnon seront implanter ici sous forme de méthode"""



class ReqCompagnon:
    """La classe de gestion des requêtes autorisés aux utilisateur"""
    def __init__(self, db):
        self.__db = db