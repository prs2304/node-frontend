import axios from "axios";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  //Error
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showerror, setShowError] = useState(false);

  const navigate = useNavigate();
  //    useEffect(() => {
  //     if (localStorage.getItem('user-info')){
  //        navigate("/Navigate")
  //     }
  //   }, [])
  const handleLogin = () => {
    console.warn(email, password);

    let data = { email: email, password: password };

    if (email === "" || email == null) {
      setEmailError("Please Enter Email");
    }
    if (password === "" || password === null) {
      setPasswordError("Please Enter Password");
    }

    if (email !== "" && password !== "") {
      axios
        .post("http://localhost:5000/login", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);

          if (res.data.auth == true) {
            navigate("/home");
            localStorage.setItem("user", JSON.stringify(res));
          } else {
            setMessage(res.data.message);
          }
        })
        .catch((err) =>{ 
        console.log(err,"ERR")
        setMessage(err.message)
        }
        );
        
    }
  };

  return (
    <div className="main">
      {/* <img src="/assets/bg.jpg" className="card-img" alt="Background"/> */}
      <div className="sub-main">
        <div>
          <h2>Sign in</h2>
          <h4>Access to your Account </h4>
          <div className="mb-3">
            <label className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
                setMessage(false);
              }}
              required
            />
            <div className="text-danger">{emailError}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
                setMessage(false);
              }}
            />
            <div className="text-danger">{passwordError}</div>
          </div>

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
            No Account <Link to="/register">Signup</Link>?
          </span>
          <br />

          <div className="login-button">
            <button
              onClick={handleLogin}
              // onClick={navigate("/home")}
              className="btn-lgn"
            >
              Next
            </button>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
