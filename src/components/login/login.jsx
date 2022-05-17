import React, { useState } from "react";
import { Form, Row, InputGroup, Button, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [validated, setValidated] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    let email = form[0].value;
    let password = form[1].value;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    let d = {
      email: email,
      password: password,
    };
    if (
      Object.keys(d).some(
        (k) => !d[k] || (k === "email" && !/\S+@\S+\.\S+/.test(d[k]))
      )
    ) {
      setValidated(true);
    } else {
      fetch("https://json-server-task-1.herokuapp.com/users")
        .then((response) => response.json())
        .then((data) => {
          let user = data.find(
            (d) => d.email === email && d.password === password
          );
          if (user) {
            navigate(`/details/${user.id}`);
          }
          setValidated(true);
        })
        .catch((e) => {
          setValidated(true);
          console.log("Eror", JSON.stringify(e));
        });
    }
    setValidated(true);
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="register-form"
    >
      <Row className="mb-3">
        <h2>Login</h2>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationEmailId">
          <Form.Label>Email Id</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Email Id"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please choose a emailId.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide password.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Login</Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to={"/register"}>
        <Button type="button">Register</Button>
      </Link>
    </Form>
  );
};

export default Login;
