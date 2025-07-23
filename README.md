# 💬 Multi-User Real-Time Chat App

A modern real-time chat application built with **Node.js**, **Express**, **MongoDB**, **EJS**, and **Socket.IO**, allowing users to:

- Join public channels and chat in real time
- View active users with online indicators
- Send and receive messages instantly
- Get a sleek, responsive UI with dark mode styling


---

## 🚀 Features

- ⚡ Real-time communication using WebSockets
- 🧑‍🤝‍🧑 Multi-user chat with live user list
- 🧠 Socket.IO for server-client messaging
- ✉️ Message timestamps and sender avatars
- 🌙 Fully dark-mode UI with modern styling
- 💾 MongoDB for storing user data (if extended)
- 🔒 Session handling and room-based chat (to be added)

---

## 🛠️ Tech Stack

| Technology         | Purpose                                     |
|--------------------|---------------------------------------------|
| Node.js + Express  | Backend server and routing                  |
| Socket.IO          | Real-time bi-directional communication      |
| MongoDB + Mongoose | (Optional) Database for user/message data   |
| EJS                | Dynamic HTML rendering                      |
| CSS                | Custom UI styling                           |
| dotenv             | Environment variable management             |
| Render             | Deployment platform                         |

---

## 📦 Environment Variables Setup

To run the app locally, create a `.env` file in the root directory with:

```env
# Server Configuration
PORT=5000                       # Port where your server runs
NODE_ENV=development            # 'development' or 'production'

# Database
DB_URI=your_mongodb_connection_string

# JWT - Access Token
JWT_ACCESS_KEY=your_access_token_secret
JWT_ACCESS_EXPIRY=15m          # e.g., 15m, 1h, 7d

# JWT - Refresh Token
JWT_REFRESH_KEY=your_refresh_token_secret
JWT_REFRESH_EXPIRY=7d

## 📸 Screenshot

### Chat Interface
![Chat UI](82c3d473-2916-4c71-9ec0-98a09d8aac31.png)


