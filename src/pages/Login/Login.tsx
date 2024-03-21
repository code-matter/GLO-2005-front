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
        <Form layout="vertical" onFinish={handleSubmitForm}>
          <Form.Item name="email" label="Courriel">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Mot de passe">
            <Input />
          </Form.Item>
          <Button htmlType="submit">Connexion</Button>
        </Form>
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

export default Login;
