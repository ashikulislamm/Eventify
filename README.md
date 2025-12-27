# Eventify

A modern, full-stack event management platform that allows users to discover, create, and manage events seamlessly.

## 🚀 Technologies

### Frontend
- **Next.js** - React framework for production with server-side rendering and static site generation
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Express.js** - Fast, minimalist web framework for Node.js
- **TypeScript** - Type-safe JavaScript
- **Prisma** - Next-generation ORM for Node.js and TypeScript
- **PostgreSQL** - Powerful, open-source relational database

## 📋 Features

- 🎫 Event discovery and browsing
- 📝 Event creation and management
- 👥 User authentication and authorization
- 🏢 Club/Organization accounts
- 📱 Responsive design
- 🔍 Advanced event search and filtering

## 🛠️ Project Structure

```
eventify/
├── frontend/          # Next.js frontend application
│   ├── app/          # Next.js app directory (pages and layouts)
│   ├── components/   # Reusable React components
│   └── public/       # Static assets
│
├── backend/          # Express.js backend API
│   └── src/
│       ├── app/
│       │   ├── config/       # Configuration files
│       │   ├── controllers/  # Request handlers
│       │   ├── middlewares/  # Custom middleware
│       │   ├── models/       # Database models
│       │   ├── routes/       # API routes
│       │   ├── services/     # Business logic
│       │   └── utils/        # Utility functions
│       ├── app.ts           # Express app setup
│       └── server.ts        # Server entry point
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Eventify
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the backend directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/eventify"
   PORT=5000
   JWT_SECRET=your_jwt_secret
   ```
   
   Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```
   
   Create a `.env.local` file in the frontend directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📝 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start production server

## 🗄️ Database

This project uses PostgreSQL with Prisma ORM. The database schema is defined in `backend/prisma/schema.prisma`.

To manage your database:
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma generate` - Generate Prisma Client

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
