import "./register.css";
import { Button, Form, Input, Select } from "antd";
import { LoginSignupService } from "../../services/LoginSignup/loginSignup";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigation = useNavigate();

  const handleSubmit = async (formData: unknown) => {
    try {
      await LoginSignupService.signUp(formData);
    } catch (error) {
      console.error(error);
    }
    navigation('/Login');
  };

  return (
    <>
      <div className="inscriprionContainer">
        <Form id="inscriptionForm" layout="vertical" onFinish={handleSubmit}>
          <p className="title">Register </p>
          <p className="message">Signup to get access to our website. </p>
          <Form.Item name="username">
            <label>
              <Input id="inscriptionInput"/>
              <span>Nom d'utilisateur</span>
            </label>
          </Form.Item>
          <div className="flex">
            <Form.Item name="prenom">
              <label>
                <Input id="inscriptionInput"/>
                <span>Prenom</span>
              </label>
            </Form.Item>
            <Form.Item name="nom">
              <label>
                <Input id="inscriptionInput"/>
                <span>Nom</span>
              </label>
            </Form.Item>
          </div>

          <Form.Item name="email">
            <label>
              <Input id="inscriptionInput"/>
              <span>Courriel</span>
            </label>
          </Form.Item>

          <Form.Item name="password">
            <label>
              <Input type="password" id="inscriptionInput"/>
              <span>Mot de passe</span>
            </label>
          </Form.Item>

          <Form.Item name="pays_id">
            <label>
              <Select options={[{ value: 1, label: "Canada" }]} allowClear defaultValue="Pays"/>
            </label>
          </Form.Item>

          <Button htmlType="submit">S'inscrire</Button>
          <p className="signin">Déjà inscrit? <a href="/connexion">Connexion</a></p>
        </Form>
      </div>
    </>
  );
}

export default Register;
