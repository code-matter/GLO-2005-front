import "./login.css";

function Login() {
  return (
    <div className="container">
    <form className="form" method="post">
        <p className="title">Login </p>
        <p className="message">Login to get access to your account</p>

        <label>
            <input placeholder="" type="text" className="input" name="identifiant" />
            <span>Username/Email</span>
        </label>
            
        <label>
            <input placeholder="" type="password" className="input" name="mdp" />
            <span>Password</span>
        </label>
        <button className="submit">Submit</button>
    </form>
</div>
  );
}

export default Login;
