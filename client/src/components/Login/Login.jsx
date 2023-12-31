import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  const handleGoogleSignIn=()=>{
    const provider = new GoogleAuthProvider();
    setSubmitButtonDisabled(true);

    signInWithPopup(auth,provider)
    .then(()=>{
      setSubmitButtonDisabled(false);
      navigate("/");
    })
    .catch((err)=>{
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
    });
  };
  return (
    <div className="Login-container">
      <div className="Login-innerBox">
        <h1 className="Login-heading">Login</h1>

        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />
        <InputControl
          label="Password"
          type={"password"} //show
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          placeholder="Enter Password"
        />
        

        <div className="Login-footer">
          <b className="error">{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </button>
          <div className="divider">
           
            <span>OR</span>
            
          </div>
          <button 
          disabled = {submitButtonDisabled}
          onClick = {handleGoogleSignIn}
          className="google-login-button"
          >Continue with Google</button>
          <p>
            Don't have an account?{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;