import { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => { }

export const LogInPage = () => {
    const [formData, setFormData] = useState({
        identifier: "", // for email or contact number
        password: "",
    });

    const navigate = useNavigate();  // Initialize useNavigate 



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Update handleSubmit to be async and call the backend

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result=await res.json();
            if(!res.ok){
                // Handle server-side validation errors (e.g., "Invalid Credentials")
                throw new Error(result.msg || 'Login failed. Please check your credentials.');

            }

            // If login is successful, the server sends back a token

            if(result.token){
                 // Store the token in localStorage

                 localStorage.setItem('token',result.token);
                 alert('Login Successful');
                 navigate('/home')


            }


        }catch(err){
            alert(err.message);


        }
      
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="identifier">Email or Contact Number</label>
                    <input type="text" id="identifier" name="identifier" value={formData.identifier} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="submit-btn">
                    Login
                </button>
            </form>
        </div>
    );
};