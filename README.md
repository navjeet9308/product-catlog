# E-commerce Product Catalog

This project is a simple e-commerce product catalog built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It includes a backend service for managing product data and a frontend interface for users to interact with the catalog.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)

## Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (local installation or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
2. **Install dependencies:**:
    ```bash
    npm install
3. **Configure environment variables:**:Create a .env file in the backend directory with the following content:
    ```env
    MONGO_URI=mongodb://localhost:27017/product-catalog
    PORT=5000
4. **Connect to MongoDB:**:Ensure your MongoDB service is running locally, or adjust the MONGO_URI in the .env file to point to your MongoDB Atlas cluster.
5. **Run the backend server:**:
    ```bash
    npm start
The backend server will run on http://localhost:5000.

## Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
2. **Install dependencies:**
    ```bash
    npm install
3. **Configure environment variables:**Create a .env file in the frontend directory with the following content:
    ```env
    REACT_APP_API_BASE_URL={APIURL}
4. **Run the frontend application:**
    ```bash
    npm start
The frontend application will run on http://localhost:3000.

## Running the Application
**Start the MongoDB service (if running locally):**

For local installations, ensure MongoDB is running.

**Start the backend server:**

Navigate to the backend directory and run npm start.

**Start the frontend application:**

Navigate to the frontend directory and run npm start.

You should now be able to access the application at http://localhost:3000, where you can view and manage the product catalog.

## API Documentation
API documentation is available at http://localhost:5000/api-docs. This includes all available endpoints and their descriptions, allowing you to test the API directly from your browser.

