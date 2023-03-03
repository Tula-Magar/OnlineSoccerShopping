import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useProductCategories from "../ProductCategory/useProductCategories";

export default function ProductEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm();
  const categories = useProductCategories();
  const { productId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://localhost:7217/api/product/${productId}`)
      .then((res) => {
        setValue("Name", res.data.name);
        setValue("Description", res.data.description);
        setValue("Price", res.data.price);
        setValue("CategoryId", res.data.category.name);
        setValue("ImageUrl", res.data.imageUrlName);
      })
      .catch((err) => {
        //console.error(err);
      });
  }, [productId]);

  console.log("watch:", watch("Categoryid"));

  useEffect(() => {
    const imageUrl = getValues().ImageUrl;
    if (imageUrl instanceof FileList && imageUrl.length > 0) {
      const file = imageUrl[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImageUrl = event.target.result;
        setValue("ImageUrl", newImageUrl);
      };
      reader.readAsDataURL(file);
    }
  }, [getValues("ImageUrl")]);

  useEffect(() => {
    if (getValues().CategoryId) {
      const category = categories.find(
        (category) =>
          parseInt(category.categoryId) === parseInt(getValues().CategoryId)
      );
      if (category) {
        setValue("CategoryId", category.name);
      }
    }
  }, [categories, getValues("CategoryId")]);

  // //console.log("watch:", watch("CategoryName"));
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("Name", data.Name);
    formData.append("Description", data.Description);
    formData.append("Price", data.Price);
    formData.append("CategoryId", data.CategoryId);
    formData.append("Image", data.ImageUrl[0]);

    console.log("Form data:", formData);
    axios
      .put("https://localhost:7217/api/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        //console.error(err);
        //console.log("Error response data:", err.response.data);
      });
  };

  return (
    <>
      <Container className="mt-5">
        <h1 className="mb-4 text-primary">Create Product</h1>
        <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Row className="gy-2 gx-1 align-items-center">
            <Form.Group as={Col} xs={12}>
              <Form.Label htmlFor="Name">Name:</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="Name"
                defaultValue={watch("Name")}
                placeholder="Enter a product name"
                {...register("Name", { required: true })}
              />
              {errors.Name && <span>This field is required</span>}
            </Form.Group>

            <Form.Group as={Col} xs={4}>
              <Form.Label htmlFor="price">Price:</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  id="price"
                  name="Price"
                  defaultChecked={watch("Price")}
                  placeholder="0.00"
                  {...register("Price", { required: true, min: 0 })}
                />
              </InputGroup>
              {errors.Price && (
                <span>This field is required and must be greater than 0</span>
              )}
            </Form.Group>

            <Form.Group as={Col} md={4}>
              <Form.Label htmlFor="image">Image:</Form.Label>
              <Form.Control
                type="file"
                id="image"
                name="image"
                accept=".jpg, .jpeg, .png .gif .bmp .tiff .svg .webp .jfif"
                defaultValue={watch("ImageUrl")}
                {...register("ImageUrl", { required: true })}
              />
            </Form.Group>

            <Form.Group as={Col} xs={4}>
              <Form.Label htmlFor="category">Category:</Form.Label>
              <Form.Select
                id="category"
                name="CategoryId"
                defaultValue={watch("CategoryId")}
                {...register("CategoryId", { required: true })}
              >
                <option defaultValue={watch("CategoryId")}>
                  {getValues("CategoryId")}
                </option>
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
              {errors.CategoryId && <span>Product category is required</span>}
            </Form.Group>

            <Form.Group as={Col} xs={12}>
              <Form.Label htmlFor="Description">Description:</Form.Label>
              <Form.Control
                as="textarea"
                id="description"
                name="Description"
                rows="4"
                cols="50"
                defaultValue={watch("Description")}
                placeholder="Enter a product description"
                {...register("Description", { required: true })}
              />
              {errors.Description && (
                <span>Product description is required</span>
              )}
            </Form.Group>

            <Col xs={12}>
              <Button type="submit" className="btn btn-primary">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container>
        <Row>
          <Col md={6}>
            <Image src={getValues().ImageUrl} alt={getValues().Name} fluid />
          </Col>

          <Col md={6}>
            <h1>{getValues().Name}</h1>

            <p className="text-success">${getValues().Price}</p>
            <p className="text-muted">{getValues().CategoryId}</p>
            <p>{getValues().Description}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
