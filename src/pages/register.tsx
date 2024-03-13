import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    mdp: "",
    cmdp: ""
  });

  const navigation = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigation('/Login');
    try {
      const res = await fetch('http://127.0.0.1:5000/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data); 

    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <>
      <div className="container">
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
      </div>
    </>
  );
}

export default Register;
