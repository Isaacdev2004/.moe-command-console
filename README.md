# Moe Command Console

A modern web application with a React frontend and Node.js backend, featuring authentication, file uploads, and a command-line interface.

## 🚀 Features

- **Frontend**: React + TypeScript + Vite + Tailwind CSS + Shadcn/ui
- **Backend**: Node.js + Express + TypeScript
- **Authentication**: JWT-based authentication
- **File Upload**: Secure file upload with validation
- **Modern UI**: Beautiful, responsive design
- **Production Ready**: Optimized for deployment

## 📁 Project Structure

```
moe-command-console-main/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── lib/               # Utilities and API service
│   └── hooks/             # Custom React hooks
├── backend/               # Backend source code
│   ├── src/               # TypeScript source
│   │   ├── routes/        # API routes
│   │   └── index.ts       # Main server file
│   ├── uploads/           # File upload directory
│   └── dist/              # Compiled JavaScript
├── public/                # Static assets
└── render.yaml            # Render deployment config
```

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
copy env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=3001
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:5173
```

5. Create uploads directory:
```bash
mkdir uploads
```

6. Start development server:
```bash
npm run dev
```

The backend will be available at `http://localhost:3001`

## 🚀 Deployment to Render

### Option 1: Using render.yaml (Recommended)

1. **Push to GitHub**: Push your code to a GitHub repository

2. **Connect to Render**: 
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

3. **Deploy**: Render will automatically deploy both services

### Option 2: Manual Deployment

#### Backend Deployment

1. **Create Web Service**:
   - Name: `moe-command-console-backend`
   - Environment: `Node`
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && npm start`

2. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=your-production-jwt-secret
   FRONTEND_URL=https://your-frontend-url.onrender.com
   ```

3. **Advanced Settings**:
   - Health Check Path: `/health`

#### Frontend Deployment

1. **Create Static Site**:
   - Name: `moe-command-console-frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

2. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

## 🔧 Development

### Available Scripts

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

#### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

### API Endpoints

#### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

#### File Upload
- `POST /api/upload/single` - Upload single file (protected)
- `POST /api/upload/multiple` - Upload multiple files (protected)
- `GET /api/upload/files` - Get user's files (protected)
- `DELETE /api/upload/files/:fileId` - Delete file (protected)

#### General API
- `GET /api/status` - Application status
- `GET /api/protected` - Protected route example
- `GET /api/profile` - Get user profile (protected)
- `PUT /api/profile` - Update user profile (protected)
- `GET /api/data` - Sample data (protected)

#### Health Check
- `GET /health` - Health check endpoint

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Request data validation
- **CORS Protection**: Cross-origin resource sharing
- **Rate Limiting**: Request throttling
- **Security Headers**: Helmet middleware
- **File Upload Security**: File type and size validation

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `FRONTEND_URL` is set correctly in backend `.env`
2. **JWT Errors**: Check that `JWT_SECRET` is set in environment variables
3. **File Upload Fails**: Verify uploads directory exists and has proper permissions
4. **Build Fails**: Ensure Node.js version is 18+ and all dependencies are installed

### Render Deployment Issues

1. **Build Fails**: Check build logs for dependency or TypeScript errors
2. **Start Fails**: Verify start command and environment variables
3. **Health Check Fails**: Ensure `/health` endpoint is working
4. **Environment Variables**: Check all required variables are set

## 📝 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
```

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the logs in your deployment platform
3. Create an issue in the repository
