import { useState } from 'react';
import axios from "axios";

export const ContactPage = () => {
    // State to hold the form data
    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });

    // State for feedback messages and loading status

    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // handle input changes and update state

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // handle backend api using axios

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            // The backend is running on http://localhost:5000
            const response = await axios.post('http://localhost:5000/api/contact', formData);

            // With Axios, a successful response (status 2xx) lands in the `try` block.
            setMessage(response.data.message);
            setIsError(false);
            // reset form after successful submission
            setFormData({
                username: '',
                email: ''
            });

        } catch (error) {
            // Axios automatically throws an error for non-2xx status codes.
            // This `catch` block handles both network errors and HTTP errors (like 400 or 500).
            console.log('submission error', error);

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setMessage(error.response.data.message || 'An error occurred.');
            } else if (error.request) {
                // The request was made but no response was received (e.g., server is down)
                setMessage('Could not connect to the server. Please try again.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setMessage('An unexpected error occurred.');
            }
            setIsError(true);

        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="container">
            <div>
                <h1>Contact Page</h1>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className="form-input">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-btn">
                    <button type="submit" className="btn" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>

            {message && (
                <div style={{ color: isError ? 'red' : 'green', marginTop: '1rem' }}>
                    {message}
                </div>
            )}
        </div>
    )
}



