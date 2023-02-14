import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateProduct = () => {
    const [product, setProduct] = useState({
        Name: '',
        Description: '',
        Price: 0,
        ImageUrl: '',
});
    const [categories, setCategories] = useState([]);
    const history = useHistory();

    React.useEffect(() => {
        axios.get('/api/productcategory')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.post('/api/product', product)
            .then(res => {
                history.push('/');
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="Name">Name:</label>
                <input type="text" id="name" name="name" value={product.Name} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="Description">Description:</label>
                <input type="text" id="description" name="description" value={product.Description} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="Price">Price:</label>
                <input type="number" id="price" name="price" value={product.Price} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="ImageUrl">ImageUrl:</label>
                <input type="text" id="imageurl" name="imageurl" value={product.ImageUrl} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="category">Category:</label>
                <select id="category" name="category" value={product.category} onChange={handleInputChange}>
                    <option value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Create</button>
        </form>
    );
};

export default CreateProduct;
