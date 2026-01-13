# Vormirex - AI-Powered Learning Platform

Vormirex is a next-generation education platform designed to personalize learning through Artificial Intelligence. It connects students with high-quality courses, interactive modules, and real-time AI tutoring.

## 🚀 Features

### Core Platform
*   **User Roles**: Students, Instructors, and Admins.
*   **Course Discovery**: Browse and search courses with advanced filtering.
*   **Curriculum Engine**: Structured learning with Levels and Modules.
*   **Progress Tracking**: User streaks, completed modules, and personalized dashboards.

### 🤖 AI Integration
*   **AI Teacher**: 24/7 personalized tutoring.
*   **Personalized Paths**: Adaptive learning roadmaps.

### 🛠️ Admin & Management
*   **Dashboard**: Real-time analytics on Users, Courses, and Revenue.
*   **Course Management**: Create, Publish, and Unpublish courses.
*   **User Management**: Manage roles and user access.

## 🏗️ Tech Stack

### Frontend
-   **React 18** with **Vite**
-   **TypeScript** for type safety
-   **TailwindCSS** for styling
-   **React Router DOM** for navigation
-   **Recharts** for analytics visualization

### Backend
-   **Node.js** & **Express**
-   **MongoDB** & **Mongoose** (Data Modeling)
-   **JWT** Authentication (Access & Refresh Tokens)
-   **Zod** for validation

### Infrastructure
-   **Docker** & **Docker Compose** for containerization
-   **Nginx** for reverse proxying

## 📦 Installation & Setup

### Prerequisites
-   Docker & Docker Compose
-   Node.js (v20+)

### Quick Start (Docker)

1.  **Clone the repository**
    ```bash
    git clone https://github.com/vormirex-ai/vormirex.git
    cd vormirex
    ```

2.  **Start Services**
    ```bash
    docker-compose up --build
    ```

3.  **Access Application**
    -   Frontend: `http://localhost:5173`
    -   Backend API: `http://localhost:3000`

### Local Development

#### Backend
```bash
cd services/backend
npm install
npm run dev
```

#### Frontend
```bash
cd services/frontend
npm install
npm run dev
```

## 📚 API Documentation

The Postman Collection is included in the repository: `vormirex_api_v2_postman_collection.json`.

Import this file into Postman to explore:
-   Auth (Login/Signup)
-   Course Management
-   Admin Analytics
-   User Operations
