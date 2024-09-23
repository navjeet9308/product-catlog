const request = require('supertest');
const app = require('../server'); // Adjust the path as necessary
const Product = require('../models/productModel'); // Adjust the path as necessary
const mongoose = require('mongoose');

describe('Product API', () => {
    // Connect to the database before running tests
    beforeAll(async () => {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/test-db';
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    // Clear the database before each test
    beforeEach(async () => {
        await Product.deleteMany({});
    });

    // Close the database connection after all tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should create a new product', async () => {
        const response = await request(app)
            .post('/api/products')
            .send({
                name: 'Test Product',
                price: 100,
                description: 'A product for testing',
                quantity: 10,
            });
        
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Test Product');
        expect(response.body.price).toBe(100);
    });

    test('should fetch all products', async () => {
        await Product.create({
            name: 'Test Product',
            price: 100,
            description: 'A product for testing',
            quantity: 10,
        });

        const response = await request(app).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });

    test('should fetch a single product by ID', async () => {
        const product = await Product.create({
            name: 'Test Product',
            price: 100,
            description: 'A product for testing',
            quantity: 10,
        });

        const response = await request(app).get(`/api/products/${product._id}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Test Product');
    });

    test('should update a product', async () => {
        const product = await Product.create({
            name: 'Test Product',
            price: 100,
            description: 'A product for testing',
            quantity: 10,
        });

        const response = await request(app)
            .put(`/api/products/${product._id}`)
            .send({
                name: 'Updated Product',
                price: 150,
                description: 'An updated product for testing',
                quantity: 5,
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Updated Product');
    });

    test('should delete a product', async () => {
        const product = await Product.create({
            name: 'Test Product',
            price: 100,
            description: 'A product for testing',
            quantity: 10,
        });

        const response = await request(app).delete(`/api/products/${product._id}`);
        expect(response.status).toBe(200);

        const findResponse = await request(app).get(`/api/products/${product._id}`);
        expect(findResponse.status).toBe(404);
    });
});
