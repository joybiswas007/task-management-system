# Task Management System

This is a simple task management system built using React for the frontend and Express.js for the backend. It allows users to register, login, and access a dashboard upon successful authentication.

## Installation

### Backend

1. Clone the repository:

2. Navigate to the `backend` directory:

```
cd backend
```

3. Install dependencies:

```bash
npm install
```

4. Start the backend server:

```
npm run start
```

### Frontend

1. Navigate to the `frontend` directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend server:

```bash
npm run dev
```

Or run concurrently from the cloned directory: `npm run start`
while running concurrently this fire up the backand and frontend at same time
so user don't have to run backand and front end separately.

## Usage

1. Open your web browser and go to `http://localhost:5173` to access the application.
2. Register for a new account by clicking on the "Register" button and providing your username, email, and password.
3. After successful registration, you will be redirected to the login page.
4. Log in using your registered email and password.
5. Upon successful login, you will be redirected to the dashboard, where you can view your user details.
6. If you try to access the dashboard without logging in, you will see an error message prompting you to log in first.