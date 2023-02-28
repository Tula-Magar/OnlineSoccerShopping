import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Button, Form } from "react-bootstrap";

export default function CategoryCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("https://localhost:7217/api/productcategory", data)
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="Name"
            {...register("Name", { required: true })}
            placeholder="Enter product category name"
          />
          {errors.Name && <span>This field is required</span>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
