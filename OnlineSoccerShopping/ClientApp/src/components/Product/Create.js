import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useProductCategories from "../ProductCategory/useProductCategories";

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const categories = useProductCategories();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("Name", data.Name);
    formData.append("Description", data.Description);
    formData.append("Price", data.Price);
    formData.append("CategoryId", data.CategoryId);
    formData.append("Image", data.ImageUrl[0]);
    console.log("Product:", data);
    axios
      .post("https://localhost:7217/api/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
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
              placeholder="Enter a product name"
              {...register("Name", { required: true })}
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
                placeholder="0.00"
                {...register("Price", { required: true, min: 0 })}
              />
            </div>
            {errors.Price && (
              <span>This field is required and must be greater than 0</span>
            )}
          </div>

          <div className="form-group col-4">
            <label htmlFor="ImageUrl">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept=".jpg, .jpeg, .png"
              className="form-control"
              {...register("ImageUrl", { required: true })}
            />
            {errors.ImageUrl && <span>This field is required</span>}
          </div>

          <div className="form-group col-4">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="CategoryId"
              className="form-control"
              {...register("CategoryId", { required: true })}
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
              placeholder="Enter a product description"
              {...register("Description", { required: true })}
            />
            {errors.Description && <span>Product description is required</span>}
          </div>

          <button type="submit" className="col-2 btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
