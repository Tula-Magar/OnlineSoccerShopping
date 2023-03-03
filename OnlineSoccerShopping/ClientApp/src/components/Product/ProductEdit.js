import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Image } from "react-bootstrap";
import useProductCategories from "../ProductCategory/useProductCategories";

const ProductEdit = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
    imageUrlName: "",
    description: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const categories = useProductCategories();

  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    axios
      .get(`https://localhost:7217/api/product/${productId}`)
      .then((res) => {
        setProduct({
          name: res.data.name,
          description: res.data.description,
          price: res.data.price,
          categoryId: res.data.category.categoryId,
          imageUrlName: res.data.imageUrlName,
        });
        reset({
          Name: res.data.name,
          Description: res.data.description,
          Price: res.data.price,
          CategoryId: res.data.category.categoryId,
          ImageUrl: res.data.imageUrlName,
        });
      })
      .catch((err) => {
        //console.error(err);
      });
  }, [reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("Name", data.Name);
    formData.append("Description", data.Description);
    formData.append("Price", data.Price);
    formData.append("CategoryId", data.CategoryId);
    if (product.imageUrlName) {
      formData.append("ImageUrl", product.imageUrlName);
    } else {
      formData.append("ImageUrl", data.Image[0]);
    }

    console.log("Form data:", formData);

    axios
      .put(`https://localhost:7217/api/product/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        console.log("Error response data:", err.response.data);
      });
  };

  return (
    <>
      <div className="mt-5">
        <h1 className="mb-4 text-primary">Create Product</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          className="row gy-2 gx-1 align-items-center"
          encType="multipart/form-data"
        >
          <div className="form-group col-12">
            <label htmlFor="Name">Name:</label>
            <input
              type="text"
              id="name"
              name="Name"
              className="form-control"
              defaultValue={product.name}
              placeholder="Enter a product name"
              {...register("Name", {
                required: true,
                onChange: (e) =>
                  setProduct({ ...product, name: e.target.value }),
              })}
            />
            {errors.Name && <span>This field is required</span>}
          </div>

          <div className="form-group col-4">
            <label htmlFor="price">Price:</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className="form-control"
                id="price"
                name="Price"
                value={product.price}
                placeholder="0.00"
                {...register("Price", {
                  required: true,
                  min: 0,
                  onChange: (e) =>
                    setProduct({ ...product, price: e.target.value }),
                })}
              />
            </div>
            {errors.Price && (
              <span>This field is required and must be greater than 0</span>
            )}
          </div>

          <div className="form-group col-4">
            <label htmlFor="ImageUrl">
              Image: no need to upload if you don't want to change the image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept=".jpg, .jpeg, .png .gif .bmp .tiff .svg .webp .jfif"
              className="form-control"
              defaultValue={product.imageUrlName}
              // {...register("ImageUrl", {
              //   required: true,
              //   onChange: (e) => {
              //     if (
              //       e.target.files instanceof FileList &&
              //       e.target.files.length > 0
              //     ) {
              //       const file = e.target.files[0];
              //       const reader = new FileReader();
              //       reader.onload = (event) => {
              //         const newImageUrl = event.target.result;
              //         setProduct({ ...product, imageUrlName: newImageUrl });
              //       };
              //       reader.readAsDataURL(file);
              //     }
              //   },
              // })}
            />

            {/* {errors.ImageUrl && <span>This field is required</span>} */}
          </div>

          <div className="form-group col-4">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="CategoryId"
              className="form-control"
              defaultValue={product.categoryId}
              {...register("CategoryId", {
                required: true,
                onChange: (e) => {
                  if (e.target.value) {
                    setProduct({
                      ...product,
                      categoryId: categories.find(
                        (category) =>
                          category.categoryId === parseInt(e.target.value)
                      )?.name,
                    });
                  }
                },
              })}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.CategoryId && <span>Product category is required</span>}
          </div>

          <div className="form-group col-12">
            <label htmlFor="Description">Description:</label>
            <textarea
              id="description"
              name="Description"
              className="form-control"
              rows="4"
              cols="50"
              defaultValue={product.description}
              placeholder="Enter a product description"
              {...register("Description", {
                required: true,
                onChange: (e) =>
                  setProduct({ ...product, description: e.target.value }),
              })}
            />
            {errors.Description && <span>Product description is required</span>}
          </div>

          <button type="submit" className="col-2 btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <Container>
        <Row>
          <Col md={6}>
            <Image src={product.imageUrlName} alt={product.name} fluid />
          </Col>
          <Col md={6}>
            <h1>{product.name}</h1>

            <p className="text-success">${product.price}</p>
            <p className="text-muted">{product.categoryId}</p>
            <p>{product.description}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductEdit;
