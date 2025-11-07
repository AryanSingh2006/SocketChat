# 💬 SocketChat - Real-Time Chat Application

A full-stack, modern real-time chat application featuring **one-to-one messaging** built with **React**, **Vite**, **Tailwind CSS**, **Node.js**, **Express**, **MongoDB**, and **Socket.IO**. Users can authenticate, connect with other users, and chat in real-time with instant message delivery and online status indicators.

---

## 🎯 Live Demo

**Frontend:** [https://socket-chat-amber.vercel.app](https://socket-chat-amber.vercel.app)  
**Backend API:** [https://socketchat-2-qwpy.onrender.com](https://socketchat-2-qwpy.onrender.com)

---

## ✨ Key Features

- 🔐 **User Authentication** - Secure signup/login with JWT tokens and HTTP-only cookies
- 💬 **One-to-One Messaging** - Real-time message delivery between two users
- 👥 **Live User List** - See all registered users with online/offline status indicators
- ⚡ **Real-Time Updates** - Powered by Socket.IO for instant message delivery without page refresh
- 📱 **Responsive UI** - Mobile-friendly design with Tailwind CSS + DaisyUI
- 🖼️ **Profile Pictures** - User avatars with Cloudinary integration
- 🌐 **Cross-Domain Ready** - Properly configured CORS for separate frontend/backend deployment
- 🚀 **Production Deployed** - Frontend on Vercel, Backend on Render

---

## 🛠️ Tech Stack

### Frontend
| Technology       | Version | Purpose                     |
| ---------------- | ------- | --------------------------- |
| React            | 19.1.1  | UI library                  |
| Vite             | 7.1.7   | Build tool & dev server     |
| Tailwind CSS     | 4.1.16  | Utility-first CSS framework |
| DaisyUI          | 5.3.10  | Tailwind component library  |
| Socket.IO Client | 4.8.1   | Real-time WebSocket client  |
| Zustand          | 5.0.8   | State management            |
| Axios            | 1.13.1  | HTTP client                 |
| React Router     | 7.9.5   | Client-side routing         |
| React Hot Toast  | 2.6.0   | Notifications               |

### Backend
| Technology | Version        | Purpose                       |
| ---------- | -------------- | ----------------------------- |
| Node.js    | LTS            | Runtime environment           |
| Express    | 5.1.0          | Web server framework          |
| MongoDB    | (Atlas)        | NoSQL database                |
| Mongoose   | 8.16.3         | MongoDB ODM                   |
| Socket.IO  | 4.8.1          | Real-time communication       |
| JWT        | (jsonwebtoken) | Authentication tokens         |
| Bcryptjs   | 3.0.2          | Password hashing              |
| Cloudinary | 2.8.0          | Image hosting & optimization  |
| CORS       | 2.8.5          | Cross-origin resource sharing |

---

## 📂 Project Structure

```
SocketChat/
├── frontend/                    # React + Vite SPA
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # React components (ChatContainer, SideBar, etc.)
│   │   ├── pages/             # Route pages (LoginPage, SignupPage, HomePage)
│   │   ├── store/             # Zustand stores (useAuthStore, useChatStore)
│   │   ├── lib/               # Utilities (axios configuration)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── backend/                     # Express + Socket.IO server
│   ├── public/                 # Static files
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   │   ├── constants.js    # Environment variables
│   │   │   ├── DB.config.js    # MongoDB connection
│   │   │   ├── socket.js       # Socket.IO setup
│   │   │   └── cloudinary.js   # Image upload config
│   │   ├── controller/         # Route handlers
│   │   │   ├── auth.controller.js
│   │   │   └── message.controller.js
│   │   ├── middleware/         # Express middleware
│   │   │   └── auth.middleware.js
│   │   ├── models/            # Mongoose schemas
│   │   │   ├── user.model.js
│   │   │   └── message.model.js
│   │   ├── routes/            # Express routes
│   │   │   ├── auth.route.js
│   │   │   └── message.route.js
│   │   ├── utils/             # Utility functions
│   │   │   └── jwt.utils.js
│   │   ├── app.js             # Express app config
│   │   └── server.js          # Server entry point
│   ├── package.json
│   └── .env
│
├── README.md                    # This file
├── LICENSE
└── vercel.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (free tier available)
- **Cloudinary** account (for image uploads)

### Local Development Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/AryanSingh2006/SocketChat.git
cd SocketChat
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file in backend/ directory
```

Configure `.env` file with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# JWT
JWT_ACCESS_KEY=your_secret_access_key_here
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_KEY=your_secret_refresh_key_here
JWT_REFRESH_EXPIRY=7d

# Cloudinary (for profile pictures)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:
```bash
npm run dev    # Development with nodemon
# or
npm start      # Production
```

Backend runs on `http://localhost:5000`

#### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

#### 4. Access the Application

Open your browser and go to: **http://localhost:5173**

---

## 📝 Environment Variables

### Backend `.env`

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB Atlas
DB_URI=mongodb+srv://username:password@cluster.mongodb.net/socketchat?retryWrites=true&w=majority

# JWT Authentication
JWT_ACCESS_KEY=your_secret_key_min_32_chars_long
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_KEY=your_refresh_secret_key
JWT_REFRESH_EXPIRY=7d

# Cloudinary Image Hosting
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=1234567890123456
CLOUDINARY_API_SECRET=your_secret_key

# Production URLs (used when NODE_ENV=production)
FRONTEND_URL=https://socket-chat-amber.vercel.app
BACKEND_URL=https://socketchat-2-qwpy.onrender.com
```

---

## 🏗️ Architecture Overview

### Data Flow

```
Frontend (React)                Backend (Express)          Database (MongoDB)
─────────────────              ─────────────────           ──────────────────
   User Input
      ↓
  [Zustand Store] ─HTTP(JWT)─→ [API Routes] ─Mongoose→ [Collections]
      ↓                          ↑ Socket.IO
  [Components]  ←─JSON Response─[Controllers]
      ↑
[Socket.IO Client] ←─Real-Time─→ [Socket.IO Server]
```

### Key Data Models

**User Schema:**
```javascript
{
  _id: ObjectId,
  fullName: String (required),
  email: String (unique, required),
  password: String (hashed with bcrypt),
  profilePic: String (Cloudinary URL),
  createdAt: Date
}
```

**Message Schema:**
```javascript
{
  _id: ObjectId,
  senderId: ObjectId (ref: User),
  receiverId: ObjectId (ref: User),
  text: String,
  image: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication Flow

1. **Signup/Login** - User credentials sent to `/api/auth/signup` or `/api/auth/login`
2. **JWT Token** - Server generates JWT and stores in HTTP-only cookie
3. **Protected Routes** - `authMiddleware` verifies token from cookies
4. **Socket.IO Connection** - User ID passed as query parameter during connection
5. **Session Persistence** - Cookies automatically sent with cross-domain requests

---

## 💬 Real-Time Messaging Flow

1. **Send Message** - Frontend emits via Socket.IO
2. **Server Processing** - Message saved to MongoDB, receiver's socket ID looked up
3. **Real-Time Delivery** - If receiver online, `newMessage` event emitted
4. **UI Update** - Frontend receives event and updates message list instantly
5. **Message History** - Messages persisted for offline delivery when user logs back in

---

## 🌐 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint          | Description            | Auth |
| ------ | ----------------- | ---------------------- | ---- |
| POST   | `/signup`         | Register new user      | ❌    |
| POST   | `/login`          | Login user             | ❌    |
| POST   | `/logout`         | Logout user            | ✅    |
| GET    | `/check`          | Verify authentication  | ✅    |
| PUT    | `/update-profile` | Update profile picture | ✅    |

### Message Routes (`/api/messages`)

| Method | Endpoint    | Description                  | Auth |
| ------ | ----------- | ---------------------------- | ---- |
| GET    | `/users`    | Get all users except current | ✅    |
| GET    | `/:id`      | Get messages with user       | ✅    |
| POST   | `/send/:id` | Send message to user         | ✅    |

---

## 🔌 Socket.IO Events

### Client → Server Events

| Event        | Payload    | Purpose                    |
| ------------ | ---------- | -------------------------- |
| `connection` | `{userId}` | User connects to Socket.IO |
| `disconnect` | -          | User disconnects           |

### Server → Client Events

| Event            | Payload         | Purpose                           |
| ---------------- | --------------- | --------------------------------- |
| `getOnlineUsers` | `[userId, ...]` | List of online user IDs           |
| `newMessage`     | Message Object  | Receive message from another user |

---

## 📦 Build & Deployment

### Frontend Deployment (Vercel)

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables (API_BASE_URL)
4. Deploy automatically on push

```bash
# Build locally
npm run build  # Creates dist/ folder
npm run preview  # Test production build
```

### Backend Deployment (Render)

1. Push to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Set environment variables (.env)
5. Render automatically runs `npm start`

**Deployment Environment Variables:**
```env
NODE_ENV=production
PORT=5000
DB_URI=mongodb+srv://...
JWT_ACCESS_KEY=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

---

## 🐛 Troubleshooting

### **CORS Errors**
- Verify `origin` in backend CORS config includes your frontend domain
- Ensure `credentials: true` is set for cross-domain cookie sharing
- Frontend should have `withCredentials: true` in axios and Socket.IO

### **"No token found" after login**
- Check browser DevTools → Application → Cookies
- Verify cookie is set with `HttpOnly` flag
- Ensure backend responds with `Set-Cookie` header
- For production: cookies need `sameSite: "None"` and `secure: true`

### **Socket.IO connection fails**
- Verify Socket.IO base URL matches backend URL
- Check Socket.IO has `withCredentials: true`
- Ensure user is authenticated before connecting
- Check browser console for CORS/auth errors

### **Messages not appearing in real-time**
- Verify Socket.IO connection in browser DevTools
- Check message is being saved to MongoDB
- Ensure receiver is online (check online users list)
- Try refreshing page to see message history

### **Profile pictures not loading**
- Verify Cloudinary credentials in `.env`
- Check image URL is accessible (Cloudinary dashboard)
- Ensure `profilePic` field is returned from backend

---

## 📚 Key Dependencies & Usage

### Frontend State Management (Zustand)

```javascript
// useAuthStore.js - Authentication & Socket.IO
import { useAuthStore } from "@/store/useAuthStore";

const { authUser, login, logout, onlineUsers } = useAuthStore();

// useChatStore.js - Messages & Users
import { useChatStore } from "@/store/useChatStore";

const { messages, selectedUser, getMessages, sendMessage } = useChatStore();
```

### Backend Authentication (Middleware)

```javascript
// Protect routes with JWT verification
import { authMiddleware } from "@/middleware/auth.middleware";

router.get("/protected-route", authMiddleware, (req, res) => {
  // req.user contains decoded JWT payload
  const userId = req.user._id;
});
```

---

## ✅ Features Implemented

✅ User registration & login with password hashing  
✅ JWT-based authentication with refresh tokens  
✅ One-to-one real-time messaging  
✅ Online/offline status indicators  
✅ User list with search capability  
✅ Message history persistence  
✅ Profile pictures with Cloudinary  
✅ Responsive mobile-first UI  
✅ Production deployment (Vercel + Render)  
✅ CORS & security headers configured  

---

## 🚦 Upcoming Features (Roadmap)

- 📸 Profile picture upload UI
- 🔍 User search functionality
- 👥 Group chat support
- ✏️ Message editing & deletion
- 👁️ Message read receipts
- ⌨️ Typing indicators
- 🔔 Desktop notifications
- 🗑️ Message archiving

---

## 📄 License

This project is licensed under the **ISC License** - see the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**Aryan Singh**

- GitHub: [@AryanSingh2006](https://github.com/AryanSingh2006)
- Repository: [SocketChat](https://github.com/AryanSingh2006/SocketChat)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For issues, questions, or suggestions:
- Open an [Issue](https://github.com/AryanSingh2006/SocketChat/issues)
- Check [Discussions](https://github.com/AryanSingh2006/SocketChat/discussions)

---

## 🙏 Acknowledgments

- Socket.IO for real-time communication
- Tailwind CSS & DaisyUI for beautiful UI
- Render & Vercel for hosting
- MongoDB Atlas for database hosting
- Cloudinary for image optimization

---

**Happy Chatting! 🎉**
