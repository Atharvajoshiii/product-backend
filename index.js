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
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

// MongoDB connection options for better error handling
const mongooseOptions = {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000,
};

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in environment variables');
} else {
    mongoose.connect(MONGODB_URI, mongooseOptions)
        .then(() => {
            console.log('✅ Connected to MongoDB successfully');
            console.log('📍 Database:', mongoose.connection.name);
        })
        .catch((error) => {
            console.error('❌ MongoDB connection error:', error.message);
            console.error('⚠️  API will start but database operations will fail');
            console.error('🔧 Check: 1) MONGODB_URI is correct, 2) Network access is configured, 3) Database user exists');
        });
}

// MongoDB connection event listeners
mongoose.connection.on('disconnected', () => {
    console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
    console.error('❌ MongoDB connection error:', error.message);
});

mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB connected');
});

// Routes
const productRoutes = require('./routes/productroute');
app.use('/api', productRoutes);

// Health check endpoint with MongoDB status
app.get('/api/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState;
    const dbStatusMap = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    };

    const isHealthy = dbStatus === 1;
    const statusCode = isHealthy ? 200 : 503;

    res.status(statusCode).json({
        success: isHealthy,
        status: isHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        database: {
            status: dbStatusMap[dbStatus],
            connected: isHealthy,
            uri: MONGODB_URI ? '✓ Configured' : '✗ Not configured'
        },
        uptime: process.uptime(),
        message: isHealthy 
            ? 'API and Database are operational' 
            : 'Database connection failed - check MongoDB configuration'
    });
});

// Root route with MongoDB connection check
app.get('/', (req, res) => {
    const dbStatus = mongoose.connection.readyState;
    const isConnected = dbStatus === 1;

    if (!isConnected) {
        return res.status(503).json({
            success: false,
            message: 'API is running but database is not connected',
            version: '1.0.0',
            database: {
                status: dbStatus === 0 ? 'disconnected' : dbStatus === 2 ? 'connecting' : 'unknown',
                error: 'MongoDB connection failed. Please check MONGODB_URI environment variable.'
            },
            healthCheck: '/api/health',
            troubleshooting: [
                'Verify MONGODB_URI is set in environment variables',
                'Check MongoDB Atlas network access allows Vercel IPs (0.0.0.0/0)',
                'Ensure database user has proper permissions',
                'Check MongoDB Atlas cluster is running'
            ]
        });
    }

    res.json({
        success: true,
        message: 'Welcome to Product API',
        version: '1.0.0',
        database: {
            status: 'connected',
            connected: true
        },
        endpoints: {
            health: '/api/health',
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
