export const LoginSignupService = {
  signUp,
  logIn,
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

  return await fetch("http://127.0.0.1:5000/inscription", params);
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

  return await fetch("http://127.0.0.1:5000/connexion", params);
}
