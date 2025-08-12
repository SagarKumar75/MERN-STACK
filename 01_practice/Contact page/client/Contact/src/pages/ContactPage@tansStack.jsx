import { useState } from 'react';
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

// It's good practice to define the API call function outside the component

const submitContactForm = async (formData) => {
    const { data } = await axios.post('http://localhost:5000/api/contact', formData);
    return data;
}

export const ContactPage = () => {
    // State to hold the form data
    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });


    // The useMutation hook replaces all our manual async state management

    const { mutate, isPending, isSuccess, isError, data, error } = useMutation({
        mutationFn: submitContactForm,
        // Optional: You can use callbacks to perform side effects
        onSuccess: () => {
            console.log("submission successfull!");
            // Reset form after successful submission
            setFormData({
                username: '',
                email: ''
            });
        },
        onError: (err) => {
            // This runs if the mutation fails
            console.log("submission error", err);
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();
        // The submit handler is now incredibly simple!
        mutate(formData);
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
                    <button type="submit" className="btn" disabled={isPending}>
                        {isPending ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>

           {/* We can now derive the feedback message directly from the mutation's state */}
            <div style={{ marginTop: '1rem' }}>
                {isSuccess && (
                    <div style={{ color: 'green' }}>{data?.message || 'Your message has been received!'}</div>
                )}
                {isError && (
                    <div style={{ color: 'red' }}>{error?.response?.data?.message || 'An error occurred.'}</div>
                )}
            </div>
        </div>
    )
}



