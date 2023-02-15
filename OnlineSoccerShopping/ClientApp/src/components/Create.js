import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    Name: "",
    Description: "",
    Price: 0,
    ImageUrl: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get("https://localhost:7217/api/productcategory")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/product", product)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  console.log(categories);

  return (
    <>
      <div className="bg-light-blue">
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center">
        <div className="col-12">
          <label htmlFor="Name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter a product name"
            value={product.Name}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="col-4">
          <label htmlFor="Price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            placeholder="Enter a product price"
            value={product.Price}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-4">
          <label htmlFor="ImageUrl">ImageUrl:</label>
          <input
            type="text"
            id="imageurl"
            name="imageurl"
            className="form-control"
            value={product.ImageUrl}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-4">
          <label htmlFor="Category">Select Category</label>
          <select
            id="category"
            name="Category"
            className="form-control"
            value={product.Category}
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
        <div className="col-12">
          <label htmlFor="Description">Description:</label>
          <textarea
            type="text"
            id="description"
            name="description"
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
