const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    searchProducts
} = require('../controllers/productcontroller');

// Create a new product
router.post('/products', createProduct);

// Get all products
router.get('/products', getAllProducts);

// Search products by name
router.get('/products/search', searchProducts);

// Get products by category
router.get('/products/category/:category', getProductsByCategory);

// Get a single product by ID
router.get('/products/:id', getProductById);

// Update a product by ID
router.put('/products/:id', updateProduct);

// Delete a product by ID
router.delete('/products/:id', deleteProduct);

module.exports = router;
