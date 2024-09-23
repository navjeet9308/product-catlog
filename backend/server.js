const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Product Catalog API',
            version: '1.0.0',
            description: 'A simple Express API for managing products',
            contact: {
                name: 'Developer',
                email: 'developer@example.com'
            },
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Development Server'
            }
        ],
    },
    apis: ['./routes/*.js'], // Path to the API documentation
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/products', productRoutes);

// Export app for testing
module.exports = app;

// Only start the server if this file is run directly (not imported in tests)
if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
