# Full-Stack Starter App (React + Node.js)

A modern full-stack starter template featuring React (Vite) frontend and Node.js/Express backend with authentication and modern UI design.

## Features

- 🚀 React + Vite frontend
- 🎨 Modern UI with clean, responsive design
- 🔐 Node.js + Express backend with authentication
- 📱 Mobile-first approach with fluid layouts
- 🎭 Google OAuth integration
- 🔄 Redux state management
- 🛣️ React Router for navigation
- 🔒 JWT Authentication
- 🎯 Form validation and error handling
- 🖌️ SCSS with modern design patterns
- 🛠️ Concurrent development servers

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- Git

## Project Structure

```
.
├── client/                    # React frontend
│   ├── public/               # Public assets
│   │   └── google-icon.svg   # Google authentication icon
│   ├── src/
│   │   ├── assets/          # SCSS and images
│   │   │   └── scss/
│   │   │       ├── cmps/    # Component styles
│   │   │       └── pages/   # Page-specific styles
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── routes/         # Routing setup
│   │   └── store/          # Redux store
│   └── package.json
└── server/                  # Node.js backend
    ├── src/
    │   ├── config/         # Configuration files
    │   ├── controllers/    # Route controllers
    │   │   ├── auth.js    # Authentication logic
    │   │   └── user.js    # User management
    │   ├── middleware/    # Custom middlewares
    │   │   ├── auth.js    # Authentication middleware
    │   │   └── error.js   # Error handling
    │   ├── models/        # Data models
    │   │   └── user.js    # User model
    │   ├── routes/        # API routes
    │   │   ├── auth.js    # Auth routes
    │   │   └── user.js    # User routes
    │   └── utils/         # Utility functions
    └── package.json
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd full-stack-starter
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Environment Setup:

   Create .env files in both client and server directories:

   client/.env:
   ```
   VITE_API_URL=http://localhost:5000
   ```

   server/.env:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
   ```

4. Start development servers:
   ```bash
   # From the root directory
   npm run dev
   ```

   This will start both frontend and backend servers concurrently:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## Authentication Flows

### Email + Password
1. Sign up with email/password:
   - POST /api/auth/signup
   - Required fields: name, email, password
   - Returns JWT token on success

2. Sign in with email/password:
   - POST /api/auth/signin
   - Required fields: email, password
   - Returns JWT token on success

### Google OAuth
1. Frontend initiates Google sign-in:
   - Click "Sign in with Google" button
   - Redirects to Google consent screen

2. Backend handles OAuth flow:
   - GET /api/auth/google
   - Handles Google callback
   - Creates/updates user account
   - Returns JWT token
   - Redirects to dashboard

## UI Components

### Authentication Pages
- Modern, clean design
- Responsive layout
- Form validation
- Error handling
- Google sign-in integration
- Loading states
- Success/error messages

### Dashboard
- Minimal design


## Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs both frontend and backend in development mode
- `npm run build` - Builds both frontend and backend for production
- `npm start` - Runs the production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 