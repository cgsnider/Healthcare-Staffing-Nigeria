import React, {useState} from 'react'
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import './LoginStyles.css';
// import { StyleSheet, Text, View } from 'React'

export default function Login() {

	const [username, getName] = useState("");
	const [password, getPass] = useState("");

	function handleLogin() {
		event.preventDefault();
	}

	function checkInput() {
		return username.length > 0 && password.length > 0;
	}

    return (
        <div className = "Login">
        	<Form onSubmit = {handleLogin}>
        		<Form.Group controlID = "username" size = "lg">
        			<Form.Label>Username</Form.Label>
        			<Form.Control autofocus 
        						  type = "username" 
        						  value = {username} 
        						  onChange = {(n) => getName(n.target.value)}/>
        		</Form.Group>

        		<Form.Group controlID = "password" size = "lg">
        			<Form.Label>Password</Form.Label>
        			<Form.Control type = "password"
        						  value = {password}
        						  onChange = {(n) => getPass(n.target.value)}/>
        		</Form.Group>

        		<Button className = "loginButton" variant = "primary" size = "lg" type = "submit" disabled = {!checkInput()}>
        			Login
        		</Button>
        	</Form>
        </div>
    );
}

