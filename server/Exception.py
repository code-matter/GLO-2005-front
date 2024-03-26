# class ContratException(Exception):
#     def __init__(self, message):
#         super().__init__(message)

class PreconditionException(Exception):
    def __init__(self, message=""):
        self.message = message
        super().__init__(message)

# class PostconditionException(ContratException):
#     def __init__(self, message=""):
#         super().__init__(message)

# class InvariantException(ContratException):
#     def __init__(self, message=""):
#         super().__init__(message)

class PersonneDejaMembreException(Exception):
    def __init__(self, message="Le nom d'utilisateur ou le courriel sont déjà pris"):
        self.message = message
        super().__init__(self.message)

class PersonneIntrouvableException(Exception):
    def __init__(self, message="L'identifiant ou le mot de passe ne sont pas valide"):
        self.message = message
        super().__init__(self.message)


# def precondition(condition, message=""):
#     if not condition:
#         raise PreconditionException(f"Erreur de precondition: {message}")

# def postcondition(condition, message=""):
#     if not condition:
#         raise PostconditionException(f"Erreur de postcondition: {message}")

# def invariant(condition, message=""):
#     if not condition:
#         raise InvariantException(f"Erreur de invariant: {message}")
