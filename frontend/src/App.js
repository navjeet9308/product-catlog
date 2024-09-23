import React, { useState, useEffect } from 'react';
import api from './api';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css';  // Import global styles

const App = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false); // Controls the form visibility

    // Fetch products from the API
    const fetchProducts = async () => {
        const { data } = await api.get('/products');
        setProducts(data);
    };

    // Fetch products on initial render
    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle product creation or update
    const handleSave = () => {
        setEditingProduct(null);
        setIsFormVisible(false); // Hide the form after saving
        fetchProducts();  // Refresh the product list after save
    };

    // Handle product edit
    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsFormVisible(true); // Show the form when editing
    };

    // Handle product delete
    const handleDelete = async (id) => {
        await api.delete(`/products/${id}`);
        fetchProducts();  // Refresh the product list after delete
    };

    // Handle Add New Product button
    const handleAddNewProduct = () => {
        setEditingProduct(null);  // Clear the editing product (we are adding new)
        setIsFormVisible(true);   // Show the form
    };

    return (
        <div className="container">
            <h1>Product Catalog</h1>

            {/* Button to Add New Product */}
            <button onClick={handleAddNewProduct}>
                Add New Product
            </button>

            {/* Show the form only when `isFormVisible` is true */}
            {isFormVisible && (
                <ProductForm product={editingProduct} onSave={handleSave} />
            )}

            <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default App;
