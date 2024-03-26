import "./register.css";
import { Button, Form, Input, Select } from "antd";
import { LoginSignupService } from "../../services/LoginSignup/loginSignup";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigation = useNavigate();

  const handleSubmit = async (formData: any) => {
    try {
      // Vérifier les champs vides avant de soumettre les données
      if (!formData['username']) {
        alert("Veuillez entrer un nom d'utilisateur");
        return;
      }
      if (!formData['prenom']) {
        alert("Veuillez entrer un prénom");
        return;
      }
      if (!formData['nom']) {
        alert("Veuillez entrer un nom");
        return;
      }
      if (!formData['password']) {
        alert("Veuillez entrer un mot de passe");
        return;
      }

      // Soumettre les données du formulaire
      await LoginSignupService.signUp(formData);

      // Naviguer vers la page de connexion après la soumission réussie
      navigation('/connexion');
    } catch (error:any) {
      // Gérer les erreurs de soumission
      window.alert(error.message);
    }
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
              <Input id="inscriptionInput"/>
              <span>Mot de passe</span>
            </label>
          </Form.Item>

          <Form.Item name="pays">
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
