""""Module dans lequel les fonctions utile aux vérification sont présente
(Peut-être utiliser une classe d'utilisation)
"""

import bcrypt
import hashlib

#Peut-être mettre dans un environnement
salt = b'$2b$12$m/F3kIXkAhsccIvucBJu7.'
#--------------------------------------

def crypt(mdp: str):
    """

    Fonction cryptant le mot de passe passées en argument

    Args:
        mdp: Le mot de passe passée en argument

    Returns:
        str: La version crypté du mot de passe 

    """
    bytes = mdp.encode('utf-8')

    hashValue = (str(bcrypt.hashpw(bytes, salt)).encode())
    newmdp = hashlib.sha256(hashValue).hexdigest()[:50]

    return newmdp