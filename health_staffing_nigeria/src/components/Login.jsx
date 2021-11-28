import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./LoginStyles.css";
// import { StyleSheet, Text, View } from 'React'

export default function Login(props) {

  const {toLanding, toRegister} = props;

  const [username, getName] = useState("");
  const [password, getPass] = useState("");

  var testUsername = "test";
  var testPassword = "password";
  var tryAgain = false;

  function checkInput() {
    return username.length > 0 && password.length > 0;
  }

  //Check username and password
  const checkLogin = () =>  {
      console.log("Check Login")
    if (username == testUsername && password == testPassword) {
      console.log("success");
      tryAgain = false;
      toLanding();
      console.log(tryAgain);
    } else {
      tryAgain = true;
      incorrect();
    }
  }

  function incorrect() {
    if (tryAgain == true) {
      console.log("test");
      return <div className="incorrect">Incorrect username or password!</div>;
    }
  }

  return (
    <div className="login_form">
      <div className="login_title">Login</div>
      {incorrect()}

      <Form onSubmit={checkLogin}>
        <Form.Group size="lg" controlid="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(n) => getName(n.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlid="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(n) => getPass(n.target.value)}
          />
        </Form.Group>
      </Form>
      <button
          className="login_buttons"
          variant="primary"
          size="lg"
          type="submit"
          onClick={checkLogin}
        >
          Login
        </button>
        <div >Need an account?</div>
        <div>
          <button
          className="login_buttons"
            variant="primary"
            size="lg"
            type="register"
            onClick={() => {
              toRegister();
            }}
          >
            Register
          </button>
        </div>
    </div>
  );
}

export class LoginBuilder {
	
	constructor(toLanding, toRegister) {
		this.toLanding = toLanding;
        this.toRegister = toRegister;
	}

	toJSX() {
		return <Login toLanding={this.toLanding} toRegister={this.toRegister}/>
	}

}

