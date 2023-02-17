import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useProductCategories from "../CustomHook/useProductCategories";
import "bootstrap-icons/font/bootstrap-icons.css";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    Name: "",
    Description: "",
    Price: 0,
    ImageUrl: "",
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
    console.log("Product:", product);
    axios
      .post("https://localhost:7217/api/product", product)
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
      <i className="bi bi-check-circle-fill"></i> Product created successfully!
    </div>
  ) : (
    <div className="alert alert-success hide" role="alert">
      Product created successfully!
    </div>
  )}

      <form onSubmit={handleSubmit} method="post" className="row gy-2 gx-1 align-items-center">
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
        
        {/* <div className="col-4">
          <label htmlFor="Price">Price:</label>
          <input
            type="number"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter a product price"
            value={product.Price}
            onChange={handleInputChange}
          />
        </div> */}
        <div className="form-group col-4">
          <label htmlFor="price">Price:</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input type="number" className="form-control" id="price" name="Price" placeholder="0.00" step="1.00" min="100.00" value={product.Price}
            onChange={handleInputChange} required/>
          </div>
        </div>

        <div className="form-group col-4">
          <label htmlFor="ImageUrl">ImageUrl:</label>
          <input
            type="text"
            id="imageurl"
            name="ImageUrl"
            className="form-control"
            value={product.ImageUrl}
            onChange={handleInputChange}
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
            {categories.map((category) => (
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
        <button type="submit" className="col-2 btn btn-primary">Create</button>
      </form>
      </div>
    </>
  );
};

export default CreateProduct;
