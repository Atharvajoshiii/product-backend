# Vercel Deployment Guide

## Prerequisites

1. **MongoDB Atlas Account** (Required for production)
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free account
   - Create a new cluster
   - Get your connection string
   - Whitelist all IP addresses (0.0.0.0/0) for Vercel

2. **GitHub Account**
   - Sign up at https://github.com if you don't have one

3. **Vercel Account**
   - Sign up at https://vercel.com (use your GitHub account)

---

## Step-by-Step Deployment

### 1. Initialize Git Repository

```bash
cd /Users/atharvajoshi/Desktop/flutter/backend
git init
git add .
git commit -m "Initial commit: Express API ready for Vercel"
```

### 2. Create GitHub Repository

**Option A: Using GitHub CLI (gh)**
```bash
# Install GitHub CLI if not installed
brew install gh

# Login to GitHub
gh auth login

# Create and push to new repository
gh repo create product-api-backend --public --source=. --remote=origin --push
```

**Option B: Using GitHub Web UI**
1. Go to https://github.com/new
2. Create a new repository named `product-api-backend`
3. Don't initialize with README, .gitignore, or license
4. Run these commands:
```bash
git remote add origin https://github.com/YOUR_USERNAME/product-api-backend.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

**Option A: Using Vercel CLI (Recommended)**
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (follow the prompts)
vercel

# For production deployment
vercel --prod
```

**Option B: Using Vercel Dashboard**
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import your GitHub repository `product-api-backend`
4. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: Leave empty or use `npm run vercel-build`
   - **Output Directory**: Leave empty
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: `production`
6. Click "Deploy"

### 4. Add Environment Variables in Vercel

After deploying, go to your project in Vercel:
1. Click "Settings" → "Environment Variables"
2. Add these variables:
   - **MONGODB_URI**: `mongodb+srv://username:password@cluster.mongodb.net/productdb`
   - **NODE_ENV**: `production`
3. Redeploy if needed

---

## Testing Your Deployed API

### 1. Get your Vercel URL
After deployment, you'll get a URL like: `https://product-api-backend.vercel.app`

### 2. Test the endpoints

**Health Check:**
```bash
curl https://your-app-name.vercel.app/
```

**Get All Products:**
```bash
curl https://your-app-name.vercel.app/api/products
```

**Create a Product:**
```bash
curl -X POST https://your-app-name.vercel.app/api/products \
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

**Get Product by ID:**
```bash
curl https://your-app-name.vercel.app/api/products/PRODUCT_ID
```

**Update Product:**
```bash
curl -X PUT https://your-app-name.vercel.app/api/products/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15 Pro",
    "price": 1199.99
  }'
```

**Delete Product:**
```bash
curl -X DELETE https://your-app-name.vercel.app/api/products/PRODUCT_ID
```

**Search Products:**
```bash
curl https://your-app-name.vercel.app/api/products/search?query=iPhone
```

**Get by Category:**
```bash
curl https://your-app-name.vercel.app/api/products/category/Electronics
```

---

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
   - Verify your connection string is correct
   - Check if database user has proper permissions

2. **404 Errors**
   - Verify `vercel.json` is properly configured
   - Check that all routes start with `/api`

3. **Environment Variables Not Working**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Make sure variables are set for "Production"
   - Redeploy after adding variables

4. **CORS Issues**
   - The API already has CORS enabled with `Access-Control-Allow-Origin: *`
   - If you need specific origins, update the CORS middleware in `index.js`

---

## Updating Your Deployment

Whenever you make changes:

```bash
# Commit changes
git add .
git commit -m "Your commit message"
git push

# Vercel will automatically redeploy on push to main branch
```

Or manually redeploy:
```bash
vercel --prod
```

---

## Local Development

To test locally before deploying:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Test locally
curl http://localhost:3000/api/products
```

---

## Monitoring

- **Vercel Dashboard**: https://vercel.com/dashboard
  - View deployment logs
  - Monitor function execution
  - Check error rates
  - View analytics

- **MongoDB Atlas**: https://cloud.mongodb.com
  - Monitor database performance
  - View query metrics
  - Check connection statistics

---

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Your API will be available at your custom domain

---

## Support

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Express.js Docs: https://expressjs.com

---

## Security Best Practices

1. Never commit `.env` file to Git
2. Use environment variables for sensitive data
3. Keep dependencies updated: `npm update`
4. Use MongoDB Atlas IP whitelist (or 0.0.0.0/0 for Vercel)
5. Implement rate limiting for production
6. Add API authentication if needed
