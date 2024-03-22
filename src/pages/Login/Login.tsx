import { Button, Form, Input } from "antd";
import "./login.css";
import { LoginSignupService } from "../../services/LoginSignup/loginSignup";
import { useState } from "react";

function Login() {
  const [user, setUser] = useState<any | null>(null);

  const handleSubmitForm = async (formData: unknown) => {
    try {
      const data = await LoginSignupService.logIn(formData);
      const user = await data.json();

      setUser(user[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!user ? (
      <div className="connexionContainer">
        <Form id="connexionForm" layout="vertical" onFinish={handleSubmitForm}>
          <p className="title">Connexion </p>
          <p className="message">Connecte toi pour avoir accès au site</p> 
          <Form.Item name="identifiant">
            <label>
              <Input id="connexionInput"/>
              <span>Identifiant</span>
            </label>
          </Form.Item>
          <Form.Item name="password">
            <label>
              <Input id="connexionInput"/>
              <span>Mot de passe</span>
            </label>
          </Form.Item>
          <Button htmlType="submit">Connexion</Button>
          <p className="signin">Toujours pas inscrit? <a href="/inscription">Inscription</a> </p>
        </Form>
      </div>
      ) : (
        <div>
          <h1>
            Salut {user.prenom} {user.nom}
          </h1>
        </div>
      )}
    </div>
  );
}
/*<div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <p className="title">Register </p>
          <p className="message">Signup to get access to our website. </p>
          <div className="flex">
            <label>
              <input placeholder="" type="text" className="input" name="firstname" value={formData.firstname} onChange={handleChange} />
              <span>Firstname</span>
            </label>
            <label>
              <input placeholder="" type="text" className="input" name="lastname" value={formData.lastname} onChange={handleChange} />
              <span>Lastname</span>
            </label>
          </div>
          <label>
            <input placeholder="" type="text" className="input" name="username" value={formData.username} onChange={handleChange} />
            <span>Username</span>
          </label>
          <label>
            <input placeholder="" type="email" className="input" name="email" value={formData.email} onChange={handleChange} />
            <span>Email</span>
          </label>
          <label>
            <input placeholder="" type="password" className="input" name="mdp" value={formData.mdp} onChange={handleChange} />
            <span>Password</span>
          </label>
          <label>
            <input placeholder="" type="password" className="input" name="cmdp" value={formData.cmdp} onChange={handleChange} />
            <span>Confirm password</span>
          </label>
          <button className="submit" type="submit">Submit</button>
          <p className="signin">Already have an account? <a href="/Login">Sign in</a> </p>
        </form>
      </div>*/

export default Login;
