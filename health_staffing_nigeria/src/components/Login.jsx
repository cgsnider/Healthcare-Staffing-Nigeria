import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./LoginStyles.css";
// import { StyleSheet, Text, View } from 'React'

export default function Login() {
  const [username, getName] = useState("");
  const [password, getPass] = useState("");

  var testUsername = "test";
  var testPassword = "password";
  var tryAgain = false;

  function checkInput() {
    return username.length > 0 && password.length > 0;
  }

  //link register page
  function toRegister() {
    return null;
  }

  //Check username and password
  function checkLogin() {
    if (username == testUsername && password == testPassword) {
      console.log("success");
      tryAgain = false;
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
    <div className="Login">
      <div className="Title">Login</div>
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

        <Button
          variant="primary"
          size="lg"
          type="submit"
          disabled={!checkInput()}
        >
          Login
        </Button>
        <div className="registerTag">Need an account?</div>
        <div className="registerButton">
          <Button
            variant="primary"
            size="lg"
            type="register"
            onClick={() => {
              toRegister();
            }}
          >
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}

export class LoginBuilder {
	
	constructor() {
		//Record data for props (looks like there are no props here)
	}

	toJSX() {
		return <Login />
	}

}

