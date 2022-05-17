import React, { useState } from "react";
import { Form, Row, InputGroup, Button, Col } from "react-bootstrap";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    let d = {
      name: form[0].value,
      password: form[1].value,
      email: form[2].value,
      address: form[3].value,
      phoneNo: form[4].value,
      role: form[5].value,
    };
    event.preventDefault();
    if (form.checkValidity() === false) {
      debugger;
      event.preventDefault();
      event.stopPropagation();
    }
    if (
      Object.keys(d).some(
        (k) => !d[k] || (k === "email" && !/\S+@\S+\.\S+/.test(d[k]))
      )
    ) {
      setValidated(true);
    } else {
      fetch("https://json-server-task-1.herokuapp.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d),
      })
        .then((response) => response.json())
        .then((data) => {
          navigate("/login");
        })
        .catch((e) => {
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
        <h2>REGISTRATION FORM</h2>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control required type="text" placeholder="Name" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
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
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom03">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Address" required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide address.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control required type="text" placeholder="Phone Number" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide phoneNumber.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Role</Form.Label>
          <Form.Select defaultValue="Admin" required>
            <option>Admin</option>
            <option>Guest</option>
          </Form.Select>
          {/* <Form.Control required type="text" placeholder="Role" /> */}
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
      <Button type="submit">Register</Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to={"/login"}>
        <Button type="button">Login</Button>
      </Link>
    </Form>
  );
};

export default Register;
