import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useProductCategories from "../ProductCategory/useProductCategories";
import GetProduct from "./GetProduct";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    Name: "",
    Description: "",
    Price: 0,
    ImageUrl: null,
    CategoryId: 0,
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const categories = useProductCategories();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("Name", product.Name);
    formData.append("Description", product.Description);
    formData.append("Price", product.Price);
    formData.append("CategoryId", product.CategoryId);
    formData.append("Image", product.ImageUrl);
    console.log("Product:", product);
    axios
      .post("https://localhost:7217/api/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate("/");
        }, 5000);
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
        {isSuccess ? (
          <div className="alert alert-success" role="alert">
            <i className="bi bi-check-circle-fill"></i> Product created
            successfully!
          </div>
        ) : (
          <div className="alert alert-success" role="alert">
            Product didn't create successfully!
          </div>
        )}

        <form
          onSubmit={handleSubmit}
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
              placeholder="Enter a product name"
              value={product.Name}
              onChange={handleInputChange}
            />
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
                placeholder="0.00"
                value={product.Price}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group col-4">
            <label htmlFor="ImageUrl">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept=".jpg, .jpeg, .png"
              className="form-control"
              onChange={(e) =>
                setProduct({ ...product, ImageUrl: e.target.files[0] })
              }
            />
          </div>

          <div className="form-group col-4">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="CategoryId"
              className="form-control"
              value={product.CategoryId}
              onChange={handleInputChange}
            >
              <option value="">Select a category</option>
              {categories.map((category, Index) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-12">
            <label htmlFor="Description">Description:</label>
            <textarea
              type="text"
              id="description"
              name="Description"
              className="form-control"
              rows="4"
              cols="50"
              placeholder="Enter a product description"
              value={product.Description}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="col-2 btn btn-primary">
            Create
          </button>
        </form>
      </div>

      <GetProduct />
    </>
  );
};

export default CreateProduct;
