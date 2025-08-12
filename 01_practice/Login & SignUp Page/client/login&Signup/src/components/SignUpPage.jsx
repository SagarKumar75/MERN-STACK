import { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./SignUpPage.css";

export const SignUpPage = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
    });

    const navigate=useNavigate();





    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Form submitted:", formData);
        // Handle form submission logic here

        // we dont need to send confirm password to the backend

        const {confirmPassword,...dataToSend}=formData;

        try{
            const res=await fetch('http://localhost:8000/api/auth/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(dataToSend)
            });

            const result=await res.json();

            if(!res.ok){
                throw new Error(result.msg || "something went wrong");
            }

            //handle success
            alert(result.msg); // "User registered successfully!"
            navigate('/login');  // Redirect to login page after successful signup

                
        

        }catch(err){
            alert(err.message);

        }
        
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Create Account</h2>
                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="contact">Contact Number</label>
                    <input type="tel" id="contact" name="contact" value={formData.contact} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                <button type="submit" className="submit-btn">
                    Sign Up
                </button>
            </form>
        </div>
    );
};