# 🌐 Social Media Full Stack App (Frontend)

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![JWT](https://img.shields.io/badge/JWT-Enabled-orange.svg)](https://jwt.io/)
[![Axios](https://img.shields.io/badge/Axios-Interceptors-green.svg)](https://axios-http.com/)
[![Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7.svg)](https://social-med-007.netlify.app)
[![Production](https://img.shields.io/badge/Status-Live-success.svg)](https://social-med-007.netlify.app)

Welcome to the **Social Media Full Stack App**! This is a modern, feature-rich social media platform built using **React.js** with secure **JWT authentication**, **role-based access control (RBAC)**, and **automatic token management**. The application provides a seamless user experience with real-time updates, image uploads via Cloudinary, and comprehensive social features.

🔗 **Live Demo:** [https://social-med-007.netlify.app](https://social-med-007.netlify.app)

---

## 📋 Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Authentication](#-authentication)
- [Components](#-components)
- [API Integration](#-api-integration)
- [Admin Features](#-admin-features)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## ✨ Features

### Core Functionality
- 🔐 **JWT Authentication** - Secure login/register with automatic token management
- 🛡️ **Role-Based Access Control** - Admin and User roles with different permissions
- 👤 **User Profiles** - Customizable profiles with avatar, cover photo, bio, location
- 📝 **Post Management** - Create, edit, and delete posts with image uploads
- 🗑️ **Smart Delete** - Users can delete own posts, Admins can delete any post
- ❤️ **Like/Unlike Posts** - Interactive post engagement
- 👥 **Follow/Unfollow Users** - Build your social network
- 📊 **Personalized Feed** - View posts from followed users
- 🖼️ **Image Uploads** - Cloudinary integration for profile and post images
- 🔍 **User Search** - Find and connect with other users
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### Security Features
- 🔒 **Automatic Token Refresh** - Axios interceptors handle token expiration
- 🎫 **Protected Routes** - All API calls include JWT token automatically
- 🚫 **Authorization Checks** - Client-side permission validation
- 🔑 **Secure Storage** - Token stored in localStorage with best practices
- 👮 **Admin Controls** - Special UI for admin users (delete any post)

### User Experience
- ⚡ **Fast & Responsive** - Optimized React components
- 🎨 **Modern UI** - Clean and intuitive interface with Material-UI icons
- 🔄 **Real-time Updates** - Instant feedback on all actions
- 📸 **Image Preview** - Preview images before upload
- ✅ **Form Validation** - Client-side validation for all inputs
- 🎯 **Context API** - Global state management for authentication

---

## 🛠️ Technologies Used

### Frontend Framework
- **React.js** (v18.x) - JavaScript library for building user interfaces
- **React Router DOM** - Client-side routing and navigation
- **Context API** - Global state management for authentication

### HTTP & API
- **Axios** - Promise-based HTTP client with interceptors
- **Axios Interceptors** - Automatic JWT token injection and refresh

### Styling & UI
- **CSS3** - Custom styling with modern CSS features
- **Material-UI Icons** - Comprehensive icon library
- **Responsive Design** - Mobile-first approach

### Image Management
- **Cloudinary** - Cloud-based image upload and hosting
- **Cloudinary Widget** - Easy-to-use upload interface

### Authentication & State
- **JWT (JSON Web Tokens)** - Secure authentication
- **LocalStorage** - Token persistence
- **AuthContext** - Global authentication state

### Build & Deployment
- **Create React App** - React application scaffolding
- **Netlify** - Production hosting and deployment
- **Environment Variables** - Configuration management

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interface Layer                   │
│                    (React Components)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Pages: Home, Login, Register, Profile               │  │
│  │  Components: Topbar, Feed, Post, Share, etc.         │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   State Management Layer                    │
│                     (Context API)                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  AuthContext: user, isFetching, error                │  │
│  │  Actions: LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE  │  │
│  │  Reducer: State updates based on actions             │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   HTTP Client Layer                         │
│                  (Axios with Interceptors)                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Request Interceptor:                                │  │
│  │    • Inject JWT token from localStorage              │  │
│  │    • Set Authorization: Bearer <token>               │  │
│  │                                                       │  │
│  │  Response Interceptor:                               │  │
│  │    • Handle 401 errors (token expiration)            │  │
│  │    • Redirect to login on auth failure               │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS/REST
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      Backend API                            │
│         https://social-media-backend-dwnj.onrender.com      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Endpoints: /api/auth, /api/users, /api/posts        │  │
│  │  JWT Verification & RBAC enforcement                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v14.x or higher)
- npm or yarn
- Backend API running (see backend README)

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/SumitDutta007/Social-Media-Full-Stack-App.git
cd Social-Media-Full-Stack-App
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file in the root directory:
```env
# Backend API URL
REACT_APP_API_URL=http://localhost:8800

# Cloudinary Configuration
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

For production, use:
```env
REACT_APP_API_URL=https://social-media-backend-dwnj.onrender.com
```

4. **Start development server**
```bash
npm start
```

The application will open at: `http://localhost:3000`

5. **Build for production**
```bash
npm run build
```

---

## ⚙️ Configuration

### Axios Configuration (`src/axios.js`)

The application uses a custom Axios instance with automatic JWT token handling:

```javascript
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://social-media-backend-dwnj.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor - Inject JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

### Context API Setup (`src/context/AuthContext.js`)

Global authentication state management:

```javascript
import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  return (
    <AuthContext.Provider value={{
      user: state.user,
      isFetching: state.isFetching,
      error: state.error,
      dispatch
    }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 🔐 Authentication

### Login Flow

1. User enters credentials on `/login` page
2. `loginCall` function in `apiCalls.js` sends POST request to `/api/auth/login`
3. Backend validates credentials and returns JWT token + user data
4. Frontend stores token in localStorage and user in Context
5. Axios interceptor automatically includes token in all subsequent requests

**Login Implementation:**
```javascript
export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const res = await axiosInstance.post('/api/auth/login', userCredentials);
    
    // Store token and user data
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user });
  } catch (err) {
    dispatch({ type: 'LOGIN_FAILURE', payload: err });
  }
};
```

### Register Flow

1. User fills registration form on `/register` page
2. Form data sent to `/api/auth/register`
3. Backend creates user and returns JWT token + user data
4. Auto-login: Token stored, user redirected to home page

### Logout Flow

1. User clicks logout button
2. Clear token and user data from localStorage
3. Redirect to login page

**Logout Implementation:**
```javascript
const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};
```

### Token Management

- **Storage:** JWT token stored in localStorage
- **Expiration:** 7 days (configured in backend)
- **Auto-Injection:** Axios interceptor adds token to all requests
- **Error Handling:** 401 responses trigger automatic logout and redirect

---

## 📦 Components

### Page Components

#### Home (`src/pages/home/Home.jsx`)
- Main feed page showing posts from followed users
- Sidebar with navigation links
- Feed component with timeline posts
- Right sidebar with online friends

#### Profile (`src/pages/profile/Profile.jsx`)
- User profile page with cover photo and avatar
- User's posts displayed below profile info
- Follow/Unfollow button for other users
- Edit profile options (own profile only)

#### Login (`src/pages/login/Login.jsx`)
- Login form with email and password
- Form validation
- Error handling with user feedback
- Link to registration page

#### Register (`src/pages/register/Register.jsx`)
- Registration form with username, email, password
- Password confirmation validation
- Auto-login after successful registration
- Link to login page

### Feature Components

#### Post (`src/components/posts/Post.jsx`)
- Individual post display with user info
- Like button with count
- Three-dot menu with delete option
- **Delete Functionality:**
  - Users can delete their own posts
  - Admins can delete any post (shows "Delete (Admin)")
  - Confirmation dialog before deletion
  - Automatic UI update after deletion

**Delete Implementation:**
```javascript
const canDelete = () => {
  const currentUserId = currentUser?._id || currentUser?.id;
  const postUserId = post.userId;
  return currentUserId === postUserId || currentUser?.isAdmin;
};

const deleteHandler = async () => {
  if (!window.confirm("Are you sure you want to delete this post?")) return;
  
  try {
    await axiosInstance.delete(`/api/posts/${post._id}`);
    setIsDeleted(true);
    window.location.reload();
  } catch (err) {
    alert(err.response?.data?.error || "Failed to delete post");
  }
};
```

#### Share (`src/components/share/Share.jsx`)
- Create new post form
- Cloudinary image upload widget
- Image preview before posting
- Post submission with user ID from context

#### Feed (`src/components/feed/Feed.jsx`)
- Timeline of posts from followed users
- Fetches posts from `/api/posts/timeline/all/:userId`
- Displays posts in reverse chronological order

#### Topbar (`src/components/topbar/topbar.jsx`)
- Navigation bar with app logo
- Search functionality
- User profile icon
- Logout button

#### Sidebar (`src/components/sidebar/Sidebar.jsx`)
- Navigation links (Feed, Friends, etc.)
- User shortcuts
- Quick access to features

#### Rightsidebar (`src/components/rightsidebar/Rightsidebar.jsx`)
- Birthday reminders
- Online friends list
- Friend suggestions

---

## 🔌 API Integration

All API calls use the custom Axios instance with automatic JWT token injection.

### Authentication APIs

```javascript
// Login
POST /api/auth/login
Body: { email, password }
Returns: { token, user }

// Register
POST /api/auth/register
Body: { username, email, password }
Returns: { token, user }
```

### User APIs

```javascript
// Get user by ID or username
GET /api/users?userId=:id
GET /api/users?username=:username
Headers: Authorization: Bearer <token>

// Update user
PUT /api/users/:id
Headers: Authorization: Bearer <token>
Body: { desc, city, from, ... }

// Follow/Unfollow user
PUT /api/users/:id/follow
Headers: Authorization: Bearer <token>
```

### Post APIs

```javascript
// Create post
POST /api/posts
Headers: Authorization: Bearer <token>
Body: { desc, img }

// Get timeline posts
GET /api/posts/timeline/all/:userId
Headers: Authorization: Bearer <token>

// Get user's posts
GET /api/posts/profile/:username
Headers: Authorization: Bearer <token>

// Like/Unlike post
PUT /api/posts/:id/like
Headers: Authorization: Bearer <token>

// Delete post
DELETE /api/posts/:id
Headers: Authorization: Bearer <token>
```

---

## 👮 Admin Features

### Admin User Credentials

- **Username:** `admin`
- **Email:** `admin@socialapp.com`
- **Password:** `Admin@123`

### Admin Capabilities

1. **Delete Any Post**
   - Admins see a three-dot menu on ALL posts (not just their own)
   - Delete button shows "🗑️ Delete (Admin)" when deleting others' posts
   - Confirmation dialog before deletion

2. **Manage Users**
   - Update any user profile
   - Delete any user account

3. **Full Access**
   - All regular user features
   - Plus administrative controls

### Admin UI Indicators

```javascript
// Check if current user is admin
const isAdmin = currentUser?.isAdmin === true;

// Show admin-specific UI
{isAdmin && (
  <button className="deleteButton">
    🗑️ Delete (Admin)
  </button>
)}
```

---

## 🌐 Deployment

### Netlify Deployment

1. **Build the application**
```bash
npm run build
```

2. **Deploy to Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

3. **Configure environment variables in Netlify**
- Go to Site Settings → Build & Deploy → Environment
- Add `REACT_APP_API_URL` with production backend URL
- Add Cloudinary configuration variables

4. **Set up redirects**
Create `public/_redirects`:
```
/*    /index.html   200
```

This ensures React Router works correctly on Netlify.

### Production URL

🔗 **Live Site:** [https://social-med-007.netlify.app](https://social-med-007.netlify.app)

---

## 📁 Project Structure

```
Social-Media-Full-Stack-App/
├── public/
│   ├── index.html
│   ├── _redirects
│   └── assets/
│       └── style.css
├── src/
│   ├── components/
│   │   ├── feed/
│   │   │   ├── Feed.jsx
│   │   │   └── feed.css
│   │   ├── posts/
│   │   │   ├── Post.jsx
│   │   │   └── post.css
│   │   ├── share/
│   │   │   ├── Share.jsx
│   │   │   └── share.css
│   │   ├── topbar/
│   │   │   ├── topbar.jsx
│   │   │   └── topbar.css
│   │   ├── sidebar/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Sidebar.css
│   │   ├── rightsidebar/
│   │   │   ├── Rightsidebar.jsx
│   │   │   └── rightbar.css
│   │   └── friends/
│   │       ├── Friend.jsx
│   │       └── friend.css
│   ├── context/
│   │   ├── AuthContext.js
│   │   ├── AuthReducer.js
│   │   └── AuthActions.js
│   ├── pages/
│   │   ├── apiCalls.js
│   │   ├── home/
│   │   │   ├── Home.jsx
│   │   │   └── home.css
│   │   ├── login/
│   │   │   ├── Login.jsx
│   │   │   └── login.css
│   │   ├── register/
│   │   │   ├── Register.jsx
│   │   │   └── register.css
│   │   └── profile/
│   │       ├── Profile.jsx
│   │       └── profile.css
│   ├── axios.js
│   ├── App.js
│   └── index.js
├── package.json
├── .env
└── README.md
```

---

## 🧪 Testing

### Test User Accounts

**Regular User:**
- Create your own account via `/register`

**Admin User:**
- Username: `admin`
- Email: `admin@socialapp.com`
- Password: `Admin@123`

### Feature Testing Checklist

- [ ] Register new account
- [ ] Login with credentials
- [ ] Create post with image
- [ ] Like/unlike posts
- [ ] Follow/unfollow users
- [ ] Delete own post
- [ ] Login as admin
- [ ] Delete any post as admin
- [ ] Update profile information
- [ ] Search for users
- [ ] View personalized timeline
- [ ] Logout

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Sumit Dutta**

- GitHub: [@SumitDutta007](https://github.com/SumitDutta007)
- LinkedIn: [Sumit Dutta](https://www.linkedin.com/in/sumit-dutta)
- Portfolio: [https://social-med-007.netlify.app](https://social-med-007.netlify.app)

---

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Material-UI for the icon library
- Cloudinary for image hosting
- Netlify for easy deployment
- Backend API hosted on Render

---

## 🗺️ Roadmap

### Completed ✅
- [x] JWT authentication with automatic token management
- [x] Role-based access control (Admin & User)
- [x] Axios interceptors for token injection
- [x] Post creation with Cloudinary upload
- [x] Like/Unlike functionality
- [x] Follow/Unfollow users
- [x] Delete posts with RBAC
- [x] User profiles with customization
- [x] Responsive design
- [x] Production deployment

### Planned 📅
- [ ] Direct messaging system
- [ ] Real-time notifications
- [ ] Comment on posts
- [ ] Share/Repost functionality
- [ ] Hashtag support
- [ ] Dark mode
- [ ] Story feature (24-hour posts)
- [ ] Video upload support
- [ ] Advanced search filters
- [ ] User analytics dashboard

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Sumit Dutta](https://github.com/SumitDutta007)

🔗 [Live Demo](https://social-med-007.netlify.app) | 📖 [Backend Repo](https://github.com/SumitDutta007/Social-Media-Backend)

</div>
