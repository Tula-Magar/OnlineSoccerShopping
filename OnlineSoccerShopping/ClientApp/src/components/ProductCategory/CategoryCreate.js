import React from "react";
import axios from "axios";

import { Button, Form } from "react-bootstrap";

export default function CategoryCreate() {
  const [category, setCategory] = React.useState({ Name: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://localhost:7217/api/productcategory", category)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        console.log("Error response data:", err.response.data);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="Name"
            value={category.Name}
            onChange={handleInputChange}
            placeholder="Enter product category name"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
