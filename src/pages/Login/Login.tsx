import { Button, Form, Input } from "antd";
import "./login.css";
import { LoginSignupService } from "../../services/LoginSignup/loginSignup";

function Login() {
  const handleSubmitForm = async (formData: unknown) => {
    try {
      await LoginSignupService.logIn(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Form layout="vertical" onFinish={handleSubmitForm}>
        <Form.Item name="email" label="Courriel">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Mot de passe">
          <Input />
        </Form.Item>
        <Button htmlType="submit">Connexion</Button>
      </Form>
    </div>
  );
}

export default Login;
