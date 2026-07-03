<div align="center">

# 🎓 EduNavigator

### Your Smart College Companion

A full-stack college management and community platform built with the **MEAN Stack** that streamlines academics, collaboration, communication, and administration within a single application.

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

---

# 📖 About

**EduNavigator** is a comprehensive college community platform designed to connect **students**, **faculty**, **administrators**, and **alumni** through a unified digital ecosystem.

The platform simplifies academic management, enhances communication, and provides intelligent recommendations to improve the overall college experience.

Whether it's managing coursework, sharing study resources, tracking attendance, or participating in discussions, EduNavigator brings everything together in one place.

---

# ✨ Features

## 🎓 Student Portal

- 📚 AI-powered Course & Skill Recommendations
- 💬 Community Discussion Forums
- 📩 Private Messaging
- 📝 Assignment Submission
- 📂 Access to Study Materials
- 📅 College Events & Announcements
- 👤 Personalized Dashboard

---

## 👨‍🏫 Faculty Portal

- 📚 Upload Study Material
- 📝 Create & Manage Assignments
- 📊 Attendance Management
- 📢 Student Communication
- 📈 Academic Progress Monitoring

---

## 🏛️ Admin Portal

- 🎓 Student Admission Management
- 💰 Fee Management
- 📋 Student Record Management
- 👨‍🎓 Alumni Information
- 👁️ Guest Access
- ⚙️ Platform Administration

---

# 💡 Key Highlights

- 🔐 Secure Authentication System
- 🤖 Smart Recommendation Engine
- 💬 Real-Time Communication
- 📱 Responsive User Interface
- 🏗 Modular Architecture
- 🚀 Scalable Backend
- 📂 Role-Based Access Control

---

# 🛠 Tech Stack

| Category | Technology |
|-----------|------------|
| Frontend | Angular, TypeScript, HTML, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT |
| Real-Time Communication | Socket.IO |
| AI | Recommendation Engine |

---

# 🏗 System Architecture

```text
                    Angular Frontend
                           │
             REST APIs & Socket.IO
                           │
                 Node.js + Express.js
                           │
             Authentication Middleware
                           │
                     MongoDB Database
```

---

# 📂 Project Structure

```text
EduNavigator
│
├── client/             # Angular Frontend
├── server/             # Express Backend
├── models/             # MongoDB Schemas
├── routes/             # REST API Routes
├── controllers/        # Business Logic
├── middleware/         # Authentication & Authorization
├── sockets/            # Socket.IO Events
├── utils/              # Utility Functions
└── README.md
```

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/HARDIKMAKKAR/EduNavigator.git
```

Move into the project

```bash
cd EduNavigator
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

or install dependencies separately for frontend and backend.

---

## 3️⃣ Configure Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## 4️⃣ Start the Backend

```bash
npm run dev
```

---

## 5️⃣ Start the Frontend

```bash
cd client

npm install

ng serve
```

The application will be available at:

```
http://localhost:4200
```

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Role-Based Authorization
- Protected API Routes
- Environment Variable Configuration

---

# 🚀 Future Enhancements

- AI Chatbot for Student Support
- Placement Portal
- Online Examination Module
- Notification Service
- Video Meeting Integration
- Mobile Application
- Docker Deployment
- CI/CD Pipeline

---

# 🤝 Contributing

Contributions are always welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

# 👨‍💻 Author

**Hardik Makkar**

- GitHub: https://github.com/HARDIKMAKKAR

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

It motivates further development and helps others discover the project.

---

<div align="center">

### 🚀 Built with the MEAN Stack to empower smarter campus experiences.

</div>
