export const LoginSignupService = {
  signUp,
  logIn,
  profile,
};

async function signUp(data: unknown) {
  const params = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch("http://127.0.0.1:5000/inscription", params);
  const responseData = await response.json();
  console.log(responseData);

  // Vérifier si responseData est défini
  if (responseData) {
    // Vérifier si la propriété 'error' est définie et qu'elle n'est pas nulle
    if (responseData.error && responseData.error.length > 0) {
      const errorMessage = responseData.error.join('\n');
      throw new Error(errorMessage);
    }

    // Si la réponse n'est pas OK, lancer une erreur avec le message d'erreur fourni par le serveur
    if (!response.ok) {
      throw new Error(responseData.error);
    }
  }

  // Retourner les données de réponse si tout est OK
  return responseData;
}



async function logIn(data: unknown) {
  const params = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  };
  /*mettre un session.setItem... */

  const response = await fetch("http://127.0.0.1:5000/connexion", params);
  const responseData = await response.json();

  console.log(responseData);

  if (!response.ok){
    throw new Error(responseData.error);
  }

  return responseData;
}

async function profile(data: unknown) {
  const params = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  };
  /*mettre un session.setItem... */

  const response = await fetch("http://127.0.0.1:5000/connexion", params);
  const responseData = await response.json();

  console.log(responseData);

  if (!response.ok){
    throw new Error(responseData.error);
  }

  return responseData;
}

export const loggedInUser=() =>{
  const sessionId = localStorage.getItem("sessionId");
  return !!sessionId;
}