import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookService } from '../../services/api';
import { toast } from 'react-hot-toast';

interface BookFormData {
    title: string;
    author: string;
    isbn: string;
    publishedDate: string;
    copiesAvailable: any;
}

const BookForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState<BookFormData>({
        title: '',
        author: '',
        isbn: '',
        publishedDate: '',
        copiesAvailable: 1
    });
    const [errors, setErrors] = useState<Partial<BookFormData>>({});

    useEffect(() => {
        if (id) {
            // Fetch book data if editing
            const fetchBook = async () => {
                try {
                    const response = await bookService.getBookById(id);
                    const book = response.data;
                    setFormData({
                        title: book.title,
                        author: book.author,
                        isbn: book.isbn,
                        publishedDate: book.publishedDate ? new Date(book.publishedDate).toISOString().split('T')[0] : '',
                        copiesAvailable: book.copiesAvailable || 1
                    });
                } catch (error) {
                    toast.error('Failed to fetch book details');
                    navigate('/books');
                }
            };
            fetchBook();
        }
    }, [id, navigate]);

    const validateForm = (): boolean => {
        const newErrors: Partial<BookFormData> = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!formData.author.trim()) {
            newErrors.author = 'Author is required';
        }
        if (!formData.isbn.trim()) {
            newErrors.isbn = 'ISBN is required';
        }
        if (formData.copiesAvailable < 0) {
            newErrors.copiesAvailable = 'Copies available cannot be negative';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'copiesAvailable' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            const bookData = {
                ...formData,
                publishedDate: formData.publishedDate ? new Date(formData.publishedDate) : undefined
            };

            if (id) {
                await bookService.updateBook(id, bookData);
                toast.success('Book updated successfully');
            } else {
                await bookService.createBook(bookData);
                toast.success('Book created successfully');
            }
            navigate('/books');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">
                {id ? 'Edit Book' : 'Create New Book'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            errors.title ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                        Author *
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            errors.author ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.author && (
                        <p className="mt-1 text-sm text-red-600">{errors.author}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
                        ISBN *
                    </label>
                    <input
                        type="text"
                        id="isbn"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            errors.isbn ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.isbn && (
                        <p className="mt-1 text-sm text-red-600">{errors.isbn}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">
                        Published Date
                    </label>
                    <input
                        type="date"
                        id="publishedDate"
                        name="publishedDate"
                        value={formData.publishedDate}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="copiesAvailable" className="block text-sm font-medium text-gray-700">
                        Copies Available
                    </label>
                    <input
                        type="number"
                        id="copiesAvailable"
                        name="copiesAvailable"
                        value={formData.copiesAvailable}
                        onChange={handleChange}
                        min="0"
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            errors.copiesAvailable ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.copiesAvailable && (
                        <p className="mt-1 text-sm text-red-600">{errors.copiesAvailable}</p>
                    )}
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => navigate('/books')}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {id ? 'Update' : 'Create'} Book
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookForm; 