# Product API Backend

Express.js backend API for product management, deployed on Vercel.

## Features

- Create, Read, Update, Delete products
- Search products by name
- Filter products by category
- MongoDB database integration
- CORS enabled for cross-origin requests

## API Endpoints

### Base URL
- **Local**: `http://localhost:3000`
- **Production**: `https://your-app.vercel.app`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| POST | `/api/products` | Create a new product |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| PUT | `/api/products/:id` | Update product by ID |
| DELETE | `/api/products/:id` | Delete product by ID |
| GET | `/api/products/search?query=name` | Search products |
| GET | `/api/products/category/:category` | Get products by category |

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
```

For Vercel deployment, set these in the Vercel dashboard.

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Start production server:
```bash
npm start
```

## Deployment on Vercel

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Testing the API

```bash
# Health check
curl https://your-app.vercel.app/

# Get all products
curl https://your-app.vercel.app/api/products

# Create a product
curl -X POST https://your-app.vercel.app/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":99.99,"category":"Electronics"}'
```

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Vercel (Serverless deployment)
