import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import BookList from './components/books/BookList';
import BookForm from './components/books/BookForm';
import { Navigate } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <div className="min-h-screen bg-gray-100">
                    <Toaster position="top-right" />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/books"
                            element={
                                <ProtectedRoute>
                                    <BookList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/books/create"
                            element={
                                <ProtectedRoute>
                                    <BookForm />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/books/edit/:id"
                            element={
                                <ProtectedRoute>
                                    <BookForm />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/" element={<Navigate to="/login" replace />} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
};

export default App;
