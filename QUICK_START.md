# 🚀 Quick Deployment Commands

## ✅ COMPLETED
- [x] Created `vercel.json` configuration
- [x] Updated `index.js` for serverless compatibility
- [x] Updated `package.json` with vercel-build script
- [x] Created `.gitignore` file
- [x] Initialized Git repository
- [x] Made initial commit

---

## 📋 NEXT STEPS - Run These Commands:

### 1️⃣ Create GitHub Repository (Choose ONE option)

**Option A: Using GitHub CLI (Recommended)**
```bash
cd /Users/atharvajoshi/Desktop/flutter/backend
gh auth login
gh repo create product-api-backend --public --source=. --remote=origin --push
```

**Option B: Manual GitHub Setup**
1. Go to: https://github.com/new
2. Repository name: `product-api-backend`
3. Make it Public
4. Don't initialize with README
5. Click "Create repository"
6. Then run:
```bash
cd /Users/atharvajoshi/Desktop/flutter/backend
git remote add origin https://github.com/YOUR_USERNAME/product-api-backend.git
git branch -M main
git push -u origin main
```

---

### 2️⃣ Deploy to Vercel (Choose ONE option)

**Option A: Using Vercel CLI (Fastest)**
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
cd /Users/atharvajoshi/Desktop/flutter/backend
vercel --prod
```

**Option B: Using Vercel Dashboard**
1. Go to: https://vercel.com/new
2. Click "Import" your GitHub repository
3. Select `product-api-backend`
4. Click "Deploy"

---

### 3️⃣ Configure Environment Variables in Vercel

**IMPORTANT**: You must set these in Vercel Dashboard!

1. Go to: https://vercel.com/dashboard
2. Select your project → Settings → Environment Variables
3. Add these variables:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | `mongodb+srv://username:password@cluster.mongodb.net/productdb` |
| `NODE_ENV` | `production` |

4. Click "Redeploy" after adding variables

---

### 4️⃣ Get MongoDB Atlas Connection String

**If you don't have MongoDB Atlas yet:**

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create a FREE account
3. Create a new FREE cluster (M0)
4. Click "Database Access" → Add New Database User
   - Username: `your_username`
   - Password: `your_password`
   - Built-in Role: `Atlas Admin`
5. Click "Network Access" → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is required for Vercel
6. Click "Database" → "Connect" → "Connect your application"
7. Copy the connection string:
   ```
   mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/productdb?retryWrites=true&w=majority
   ```

---

### 5️⃣ Test Your Deployed API

After deployment, Vercel gives you a URL like:
`https://product-api-backend.vercel.app`

**Test endpoints:**

```bash
# Replace YOUR_VERCEL_URL with your actual URL

# 1. Health check
curl https://YOUR_VERCEL_URL/

# 2. Get all products
curl https://YOUR_VERCEL_URL/api/products

# 3. Create a product
curl -X POST https://YOUR_VERCEL_URL/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "This is a test",
    "price": 29.99,
    "category": "Electronics",
    "stock": 100
  }'

# 4. Search products
curl https://YOUR_VERCEL_URL/api/products/search?query=Test
```

---

## 🔍 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if IP whitelist is set to 0.0.0.0/0 in MongoDB Atlas
# Verify MONGODB_URI in Vercel environment variables
# Check Vercel logs: Vercel Dashboard → Your Project → Deployments → View Function Logs
```

### Deployment Failed
```bash
# Check build logs in Vercel Dashboard
# Ensure package.json has all dependencies
# Verify vercel.json syntax
```

### 404 Errors
```bash
# Verify routes in browser
# Check vercel.json routing configuration
# Ensure you're using /api prefix for product routes
```

---

## 📱 Update Your Flutter App

After successful deployment, update your Flutter app's API URL:

**In `lib/api_functions/product.dart`:**
```dart
// Replace this:
static const String baseUrl = 'http://localhost:3000';

// With your Vercel URL:
static const String baseUrl = 'https://YOUR_VERCEL_URL';
```

---

## 🔄 Future Updates

Whenever you make changes to your backend:

```bash
cd /Users/atharvajoshi/Desktop/flutter/backend
git add .
git commit -m "Description of changes"
git push
```

Vercel will automatically redeploy! 🎉

---

## 📚 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repository**: https://github.com/YOUR_USERNAME/product-api-backend
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Vercel Docs**: https://vercel.com/docs
- **Full Guide**: See `DEPLOYMENT_GUIDE.md` in this folder

---

## ⚡ Pro Tips

1. **Check Vercel Logs**: Dashboard → Project → Deployments → View Logs
2. **Monitor MongoDB**: Atlas Dashboard → Metrics
3. **Use Environment**: Different env vars for staging/production
4. **Custom Domain**: Add in Vercel → Settings → Domains
5. **API Testing**: Use Postman or Insomnia for easier testing

---

## ✨ You're All Set!

Your backend is now:
- ✅ Git version controlled
- ✅ Ready for GitHub
- ✅ Configured for Vercel
- ✅ Serverless-compatible
- ✅ Production-ready

Just follow the numbered steps above! 🚀
