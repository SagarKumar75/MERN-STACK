import { useState } from 'react';

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

    // handle backend api using fetch

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            // The backend is running on http://localhost:5000


            const res = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (res.ok) {  // check if resonse is 200
                setMessage(result.message);
                setIsError(false);
                // reset form after successfu submission
                setFormData({
                    username: '',
                    email: ''
                });
            } else {
                setMessage(result.message || "An error occured");
                setIsError(true);
            }



        } catch (error) {
            console.log('submission error', error);
            setMessage('Could not connect to the server. Please try again.');
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



