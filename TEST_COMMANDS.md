# Simple API Test Commands

Replace `YOUR_VERCEL_URL` with your actual Vercel deployment URL.

## 1. Health Check
```bash
curl https://YOUR_VERCEL_URL/
```

## 2. Get All Products
```bash
curl https://YOUR_VERCEL_URL/api/products
```

## 3. Create a Product
```bash
curl -X POST https://YOUR_VERCEL_URL/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15",
    "description": "Latest Apple smartphone",
    "price": 999.99,
    "category": "Electronics",
    "stock": 50,
    "imageUrl": "https://example.com/iphone15.jpg"
  }'
```

## 4. Get Product by ID
```bash
# Replace PRODUCT_ID with actual ID from create response
curl https://YOUR_VERCEL_URL/api/products/PRODUCT_ID
```

## 5. Update Product
```bash
# Replace PRODUCT_ID with actual ID
curl -X PUT https://YOUR_VERCEL_URL/api/products/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15 Pro",
    "price": 1199.99
  }'
```

## 6. Delete Product
```bash
# Replace PRODUCT_ID with actual ID
curl -X DELETE https://YOUR_VERCEL_URL/api/products/PRODUCT_ID
```

## 7. Search Products
```bash
curl https://YOUR_VERCEL_URL/api/products/search?query=iPhone
```

## 8. Get Products by Category
```bash
curl https://YOUR_VERCEL_URL/api/products/category/Electronics
```

---

## Use the Test Script (Easier)

Instead of running these commands manually, use the provided test script:

```bash
cd /Users/atharvajoshi/Desktop/flutter/backend
./test-api.sh https://YOUR_VERCEL_URL
```

This will automatically run all tests and show you the results with colored output!

---

## Pretty Print JSON (Optional)

For better readability, install `jq`:
```bash
brew install jq
```

Then add `| jq` to any curl command:
```bash
curl https://YOUR_VERCEL_URL/api/products | jq
```
