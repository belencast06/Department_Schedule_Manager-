# Department Schedule Manager

A full-stack web application that allows department heads to create and manage class schedules — adding courses, assigning sections, and updating instructor assignments.

## Tech Stack

**Frontend:** React 19, Vite, Zustand, Bootstrap 5  
**Backend:** Node.js, Express  
**Database:** SQLite

## Project Structure

```
Department_Schedule_Manager-/
├── server/               # Express backend
│   ├── server.js         # API server (runs on port 8080)
│   └── data.sqlite       # SQLite database
└── webDevReact/          # React + Vite frontend
    └── src/
        ├── App.jsx       # Main UI component
        └── store.js      # Zustand state management
```

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

1. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Install frontend dependencies**
   ```bash
   cd webDevReact
   npm install
   ```

### Running the App

1. **Start the backend** (in one terminal)
   ```bash
   cd server
   node server.js
   ```
   Server runs at `http://localhost:8080`

2. **Start the frontend** (in a second terminal)
   ```bash
   cd webDevReact
   npm run dev
   ```
   App runs at `http://localhost:5173`

### Production Build

```bash
cd webDevReact
npm run build
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/getTermInfo` | Fetch all instructors and courses with sections |
| POST | `/addCourse` | Add a new course |
| POST | `/addSection` | Add a section to a course |
| PUT | `/updateSection` | Change a section's instructor |
| DELETE | `/deleteSection/:section_id` | Delete a section |

## Features

- Add courses by name
- Add multiple sections per course and assign an instructor to each
- Reassign instructors to sections via dropdown
- Delete sections
- Real-time UI updates via Zustand state management

## Database Schema

**courses** — `id`, `name`  
**instructors** — `id`, `name`  
**sections** — `id`, `course_id`, `instructor_id`
