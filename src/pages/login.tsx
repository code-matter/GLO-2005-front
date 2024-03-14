import { Button, Form, Input, InputNumber, Select } from "antd";
import "./login.css";

function Login() {
  const handleSubmitForm = async (formData: any) => {
    console.log("formData", formData);
    try {
      await fetch("http://127.0.0.1:5000/compagnons", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    //     <div className="container">
    //     <form className="form" method="post">
    //         <p className="title">Login </p>
    //         <p className="message">Login to get access to your account</p>

    //         <label>
    //             <input placeholder="" type="text" className="input" name="identifiant" />
    //             <span>Username/Email</span>
    //         </label>

    //         <label>
    //             <input placeholder="" type="password" className="input" name="mdp" />
    //             <span>Password</span>
    //         </label>
    //         <button className="submit">Submit</button>
    //     </form>
    // </div>
    <div>
      <Form layout="vertical" onFinish={handleSubmitForm}>
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
    </div>
  );
}

export default Login;
