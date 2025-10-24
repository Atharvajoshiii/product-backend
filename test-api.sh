#!/bin/bash

# Product API Testing Script
# Usage: ./test-api.sh <YOUR_VERCEL_URL>
# Example: ./test-api.sh https://product-api-backend.vercel.app

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if URL is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Please provide your Vercel URL${NC}"
    echo "Usage: ./test-api.sh <YOUR_VERCEL_URL>"
    echo "Example: ./test-api.sh https://product-api-backend.vercel.app"
    exit 1
fi

API_URL=$1

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Testing Product API: $API_URL${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Test 1: Health Check
echo -e "${YELLOW}Test 1: Health Check (GET /)${NC}"
response=$(curl -s -w "\n%{http_code}" "$API_URL/")
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✓ PASSED${NC} - Status: $http_code"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
else
    echo -e "${RED}✗ FAILED${NC} - Status: $http_code"
    echo "$body"
fi
echo ""

# Test 2: Get All Products
echo -e "${YELLOW}Test 2: Get All Products (GET /api/products)${NC}"
response=$(curl -s -w "\n%{http_code}" "$API_URL/api/products")
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✓ PASSED${NC} - Status: $http_code"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
else
    echo -e "${RED}✗ FAILED${NC} - Status: $http_code"
    echo "$body"
fi
echo ""

# Test 3: Create a Product
echo -e "${YELLOW}Test 3: Create Product (POST /api/products)${NC}"
response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/api/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test iPhone 15",
    "description": "Latest Apple smartphone for testing",
    "price": 999.99,
    "category": "Electronics",
    "stock": 50,
    "imageUrl": "https://example.com/iphone15.jpg"
  }')
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" -eq 201 ] || [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✓ PASSED${NC} - Status: $http_code"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
    # Extract product ID for next tests
    PRODUCT_ID=$(echo "$body" | jq -r '.data._id' 2>/dev/null)
else
    echo -e "${RED}✗ FAILED${NC} - Status: $http_code"
    echo "$body"
fi
echo ""

# Test 4: Get Product by ID (if we have an ID)
if [ ! -z "$PRODUCT_ID" ] && [ "$PRODUCT_ID" != "null" ]; then
    echo -e "${YELLOW}Test 4: Get Product by ID (GET /api/products/$PRODUCT_ID)${NC}"
    response=$(curl -s -w "\n%{http_code}" "$API_URL/api/products/$PRODUCT_ID")
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" -eq 200 ]; then
        echo -e "${GREEN}✓ PASSED${NC} - Status: $http_code"
        echo "$body" | jq '.' 2>/dev/null || echo "$body"
    else
        echo -e "${RED}✗ FAILED${NC} - Status: $http_code"
        echo "$body"
    fi
    echo ""

    # Test 5: Update Product
    echo -e "${YELLOW}Test 5: Update Product (PUT /api/products/$PRODUCT_ID)${NC}"
    response=$(curl -s -w "\n%{http_code}" -X PUT "$API_URL/api/products/$PRODUCT_ID" \
      -H "Content-Type: application/json" \
      -d '{
        "name": "Updated iPhone 15 Pro",
        "price": 1199.99
      }')
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" -eq 200 ]; then
        echo -e "${GREEN}✓ PASSED${NC} - Status: $http_code"
        echo "$body" | jq '.' 2>/dev/null || echo "$body"
    else
        echo -e "${RED}✗ FAILED${NC} - Status: $http_code"
        echo "$body"
    fi
    echo ""

    # Test 6: Delete Product
    echo -e "${YELLOW}Test 6: Delete Product (DELETE /api/products/$PRODUCT_ID)${NC}"
    response=$(curl -s -w "\n%{http_code}" -X DELETE "$API_URL/api/products/$PRODUCT_ID")
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" -eq 200 ]; then
        echo -e "${GREEN}✓ PASSED${NC} - Status: $http_code"
        echo "$body" | jq '.' 2>/dev/null || echo "$body"
    else
        echo -e "${RED}✗ FAILED${NC} - Status: $http_code"
        echo "$body"
    fi
    echo ""
fi

# Test 7: Search Products
echo -e "${YELLOW}Test 7: Search Products (GET /api/products/search?query=iPhone)${NC}"
response=$(curl -s -w "\n%{http_code}" "$API_URL/api/products/search?query=iPhone")
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✓ PASSED${NC} - Status: $http_code"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
else
    echo -e "${RED}✗ FAILED${NC} - Status: $http_code"
    echo "$body"
fi
echo ""

# Test 8: Get by Category
echo -e "${YELLOW}Test 8: Get by Category (GET /api/products/category/Electronics)${NC}"
response=$(curl -s -w "\n%{http_code}" "$API_URL/api/products/category/Electronics")
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✓ PASSED${NC} - Status: $http_code"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
else
    echo -e "${RED}✗ FAILED${NC} - Status: $http_code"
    echo "$body"
fi
echo ""

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Testing Complete!${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "\n${GREEN}Note: Install 'jq' for better JSON formatting${NC}"
echo -e "${GREEN}Command: brew install jq${NC}\n"
