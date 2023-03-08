import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { Alert } from "react-bootstrap";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Errors
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const data = (e) => {
    console.log(name, email, password);
    e.preventDefault();
    let data = { username: name, email: email, password: password };
    if (name === "" || name === null) {
      setNameError("Please Enter Name");
    }
    if (email === "" || email === null) {
      setEmailError("Please Enter Email");
    }
    if (password === "" || password === null) {
      setPasswordError("Please Enter Password");
    }

    if (email !== "" && password !== "") {
      axios
        .post("http://localhost:5000/register", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);

          if (res.data.result !== "No Details Entered") {
            setShow(true);
            // navigate("/login");
            localStorage.setItem("user", JSON.stringify(res));
          }
        })
        .catch((err) => {
          console.log(err);
          setMessage(err.message);
        });
    }
  };

  return (
    // <form className="Form">
    <div className="main">
      <div className="sub-main">
        <div>
          <ToastContainer position="top-center" className="p-3">
            <Toast
              className="d-inline-block m-1"
              bg="success"
              onClose={() => setShow(false)}
              show={show}
              delay={4000}
              autohide
            >
              <Toast.Header bg="Success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-check"
                  viewBox="0 0 16 16"
                  color="green"
                >
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                </svg>
                <strong className="me-auto">Registred Successfully</strong>
              </Toast.Header>
            </Toast>
          </ToastContainer>
          <h2>Sign Up Page</h2>
          <h4>Fill Details to Signup </h4>
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
            }}
          />
          <div className="text-danger">{nameError}</div>
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
          />
          <div className="text-danger">{emailError}</div>
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
          />
          <div className="text-danger">{passwordError}</div>
          {message ? (
            <Alert
              show={message}
              variant="danger"
              onClose={() => setMessage(false)}
              dismissible
              style={{ marginTop: "10px" }}
            >
              {message}
            </Alert>
          ) : null}
          <br />
          <span>
            Back to <Link to="/">Login</Link>?
          </span>
          <br />
          <br />
          <div className="Register-button">
            <button onClick={data} className="btn-lgn">
              Submit
            </button>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
