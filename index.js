const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware (for Flutter app to connect)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/productdb';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB successfully');
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    });

// MongoDB connection event listeners
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

// Routes
const productRoutes = require('./routes/productroute');
app.use('/api', productRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Product API',
        version: '1.0.0',
        endpoints: {
            products: '/api/products',
            createProduct: 'POST /api/products',
            getProducts: 'GET /api/products',
            getProductById: 'GET /api/products/:id',
            updateProduct: 'PUT /api/products/:id',
            deleteProduct: 'DELETE /api/products/:id',
            searchProducts: 'GET /api/products/search?query=name',
            getByCategory: 'GET /api/products/category/:category'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server (only for local development)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
        console.log(`📍 API URL: http://localhost:${PORT}`);
        console.log(`📍 Products endpoint: http://localhost:${PORT}/api/products`);
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
        console.log('\n🛑 Shutting down gracefully...');
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    });
}

// Export the Express app for Vercel serverless
module.exports = app;
