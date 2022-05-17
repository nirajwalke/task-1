import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import "./details.css";
import { useParams, Link } from "react-router-dom";

const Details = (props) => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    console.log("id", id);
    fetch("https://json-server-task-1.herokuapp.com/users/" + id)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((e) => {
        console.log("Eror", JSON.stringify(e));
      });
  }, [id]);

  return (
    <>
      <h2 as="Col" style={{ marginLeft: "10%" }}>
        User Details
      </h2>
      <Table
        striped
        bordered
        hover
        size="sm"
        variant={user?.role !== "Guest" ? "dark" : ""}
        className={user?.role === "Guest" ? "guest-css" : "details"}
      >
        <thead>
          <tr>
            <th style={{ width: "2%" }}>#</th>
            <th style={{ width: "30%" }}>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NAME</td>
            <td colSpan={2}>{user?.name}</td>
          </tr>
          <tr>
            <td>Email Id</td>
            <td colSpan={2}>{user?.email}</td>
          </tr>
          <tr>
            <td>Phone No</td>
            <td colSpan={2}>{user?.phoneNo}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td colSpan={2}>{user?.address}</td>
          </tr>
          <tr>
            <td>Role</td>
            <td colSpan={2}>{user?.role}</td>
          </tr>
        </tbody>
      </Table>
      <Row>
        <Link as={Col} to={`/edit/${id}`} style={{ marginLeft: "10%" }}>
          <Button type="button">Edit</Button>
        </Link>
        <Link as={Col} to={"/login"} style={{ marginLeft: "10%" }}>
          <Button type="button">Logout</Button>
        </Link>
      </Row>
    </>
  );
};

export default Details;
