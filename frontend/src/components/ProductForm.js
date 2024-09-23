import React, { useState, useEffect } from 'react';
import './ProductForm.css';
import api from '../api'; // Ensure you are importing the API helper

const ProductForm = ({ product, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        quantity: ''
    });

    const [errors, setErrors] = useState({});

    // Initialize form data when editing a product
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price,
                description: product.description,
                quantity: product.quantity
            });
        } else {
            setFormData({
                name: '',
                price: '',
                description: '',
                quantity: ''
            });
        }
    }, [product]);

    // Validation for positive numbers
    const validateForm = () => {
        const newErrors = {};

        if (formData.price <= 0) {
            newErrors.price = 'Price must be a positive number';
        }
        if (formData.quantity <= 0) {
            newErrors.quantity = 'Quantity must be a positive number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Run validation
        if (validateForm()) {
            try {
                if (product) {
                    // Update product if editing
                    await api.put(`/products/${product._id}`, formData);
                } else {
                    // Create new product if adding
                    await api.post('/products', formData);
                }
                onSave();  // Call onSave to refresh product list and close form
            } catch (error) {
                console.error('Error saving product:', error);
                setErrors({ general: 'Failed to save product' });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                required
            />

            <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                required
            />
            {errors.price && <span className="error">{errors.price}</span>} {/* Display error */}

            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />

            <input
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                required
            />
            {errors.quantity && <span className="error">{errors.quantity}</span>} {/* Display error */}

            <div>
                <button type="submit">{product ? 'Update Product' : 'Add Product'}</button>
                <button type="button" onClick={() => onSave(null)}>Cancel</button>
            </div>

            {errors.general && <span className="error">{errors.general}</span>} {/* General error */}
        </form>
    );
};

export default ProductForm;
