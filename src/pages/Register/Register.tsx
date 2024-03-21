import "./register.css";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { LoginSignupService } from "../../services/LoginSignup/loginSignup";

function Register() {
  const handleSubmit = async (formData: unknown) => {
    try {
      await LoginSignupService.signUp(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="prenom" label="Prenom">
          <Input />
        </Form.Item>
        <Form.Item name="nom" label="Nom">
          <Input />
        </Form.Item>
        <Form.Item name="age" label="Age">
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>
        <Form.Item name="email" label="Courriel">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Mot de passe">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="pays_id" label="Pays">
          <Select options={[{ value: 1, label: "Canada" }]} allowClear />
        </Form.Item>
        <Button htmlType="submit">S'inscrire</Button>
      </Form>
    </>
  );
}

export default Register;
