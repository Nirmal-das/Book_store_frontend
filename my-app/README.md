# Book Store Frontend

A modern React application for managing books with authentication and CRUD operations.

## Features

- User authentication (login/register)
- Book listing with pagination
- Create, read, update, and delete books
- Modern UI with Tailwind CSS
- Responsive design
- Toast notifications
- Protected routes

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- React Router
- Axios
- Headless UI
- Hero Icons
- React Hot Toast

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Building for Production

To create a production build:

```bash
npm run build
```

## Project Structure

```
src/
  ├── components/     # React components
  │   ├── auth/      # Authentication components
  │   └── books/     # Book management components
  ├── context/       # React context providers
  ├── services/      # API services
  └── App.tsx        # Main application component
```
