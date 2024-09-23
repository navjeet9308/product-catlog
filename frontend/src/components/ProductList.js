import React from 'react';
import './ProductList.css';

const ProductList = ({ products, onEdit, onDelete }) => {
    // Function to handle delete with confirmation
    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete) {
            onDelete(id);  // If confirmed, proceed with the delete
        }
    };

    return (
        <div className="product-list">
            {products.length > 0 ? (
                products.map(product => (
                    <div className="product-item" key={product._id}>
                        <div className="product-info">
                            <label>Name:</label>
                            <span>{product.name}</span>
                        </div>
                        <div className="product-info">
                            <label>Price:</label>
                            <span>${product.price}</span>
                        </div>
                        <div className="product-info">
                            <label>Description:</label>
                            <span>{product.description}</span>
                        </div>
                        <div className="product-info">
                            <label>Quantity:</label>
                            <span>{product.quantity}</span>
                        </div>
                        <div className="product-actions">
                            <button onClick={() => onEdit(product)}>Edit</button>
                            <button onClick={() => handleDelete(product._id)}>Delete</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
};

export default ProductList;
