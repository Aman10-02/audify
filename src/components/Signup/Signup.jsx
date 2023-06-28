import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
<<<<<<< HEAD
import Swal from 'sweetalert2';
=======
>>>>>>> 3e8c79870f3af177065ae680ecf69409d2cbd186

import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";

import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
<<<<<<< HEAD
    
    if (values.pass.length < 8) {
      Swal.fire({
        title: "Password Error",
        text: "Password should be at least 8 characters long",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailRegex.test(values.email)) {
      Swal.fire({
        title: "Email Error",
        text: "Please enter a valid email address",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
=======
>>>>>>> 3e8c79870f3af177065ae680ecf69409d2cbd186

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/login");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className="Signup-container">
      <div className="Signup-innerBox">
        <h1 className="Signup-heading">Signup</h1>

        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
<<<<<<< HEAD
          type="password"
=======
>>>>>>> 3e8c79870f3af177065ae680ecf69409d2cbd186
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />
<<<<<<< HEAD
        <div className="divider"></div>
=======

>>>>>>> 3e8c79870f3af177065ae680ecf69409d2cbd186
        <div className="Signup-footer">
          <b className="error">{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default Signup;
=======
export default Signup;
>>>>>>> 3e8c79870f3af177065ae680ecf69409d2cbd186
