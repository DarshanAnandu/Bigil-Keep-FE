import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = ({ setIsLoggedIn }) => {
    const [isLoginForm, setIsLoginForm] = useState(false);
    const [email, setEmail] = useState('');
    const [email_LI, setEmail_LI] = useState('');
    const [password_LI, setPassword_LI] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [mobileNo, setMobileNo] = useState('');
    const [validMobileNo, setValidMobileNo] = useState(true);
    // const navigate = useNavigate();


    const handleMobileNoChange = (event) => {
        const inputValue = event.target.value;
        setMobileNo(inputValue);

        // Validate mobile number format using regex
        const isValidMobileNo = /^\d{10}$/.test(inputValue);
        setValidMobileNo(isValidMobileNo);
    };

    const handleToggleForm = () => {
        setIsLoginForm(!isLoginForm);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleEmail_LI = (event) => {
        setEmail_LI(event.target.value);
    };
    const handlePassword_LI = (event) => {
        setPassword_LI(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        if (password === event.target.value) {
            setPasswordsMatch(true);
            console.log('Passwords match');
        } else {
            setPasswordsMatch(false);
            console.log('Passwords do not match');
        }
    };
    const handleLogin = (event) => {
        event.preventDefault(); // Prevent default form submission
        console.log('Login form submitted');
        // Add logic for login
        localStorage.setItem('setIsLoggedIn', true)
        // setIsLoggedIn(true); // Set isLoggedIn to true after successful login
    };

    const handleSignUp = (event) => {
        event.preventDefault(); // Prevent default form submission
        console.log('Signup form submitted');
        // Add logic for signup
        localStorage.setItem('setIsLoggedIn', true)
        // setIsLoggedIn(true); // Set isLoggedIn to true after successful signup
    };
    return (
        <div className='wrapper-body'>
            <div className="wrapper">
                <div className="title-text">
                    <div className={`title ${isLoginForm ? 'login' : 'signup'}`}>{isLoginForm ? 'Login Form' : 'Signup Form'}</div>
                </div>
                <div className="form-container">
                    <div className="slide-controls">
                        <input type="radio" name="slide" id="login" checked={isLoginForm} onChange={handleToggleForm} />
                        <input type="radio" name="slide" id="signup" checked={!isLoginForm} onChange={handleToggleForm} />
                        <label htmlFor="login" className="slide login">
                            Login
                        </label>
                        <label htmlFor="signup" className="slide signup">
                            Signup
                        </label>
                        <div className="slider-tab" />
                    </div>
                    <div className="form-inner">
                        {isLoginForm ? (
                            <form onSubmit={handleLogin} className="login">
                                <div className="field">
                                    <input type="text" placeholder="Email Address" value={email_LI} onChange={handleEmail_LI} required />
                                </div>
                                <div className="field">
                                    <input type="password" placeholder="Password" value={password_LI} onChange={handlePassword_LI} required />
                                </div>
                                <div className="pass-link">
                                    {/* <Link to='/'>Forgot password?</Link> */}
                                </div>
                                <div className="field btn">
                                    <div className="btn-layer" />
                                    <input type="submit" defaultValue="Login" />
                                </div>
                                <div className="signup-link flex justify-center">
                                    Not a member? <div className='text-blue-600 cursor-pointer' onClick={() => handleToggleForm()}>Signup now</div>
                                </div>
                                <div className="field btn">
                                    {/* <div /> */}
                                    <button className="btn-layer text-[#fff] font-semibold text-[20px]" onClick={() => {
                                        localStorage.setItem('setIsLoggedIn', true)
                                        localStorage.setItem('institutionId', "jingle122");
                                        window.location.reload();
                                    }}>Sign in as Guest {`> > >`}</button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleSignUp} className="signup">
                                <div className="field">
                                    <input type="text" placeholder="Email Address" value={email} onChange={handleEmail} required />
                                </div>
                                <div className="field">
                                    <input type="tel" placeholder="Mobile No" required value={mobileNo} onChange={handleMobileNoChange} />
                                </div>
                                {!validMobileNo && (
                                    <div style={{ color: 'red' }}>Please enter a valid 10-digit mobile number</div>
                                )}
                                <div className="field">
                                    <input type="password" placeholder="Password" required value={password} onChange={handlePasswordChange} />
                                </div>
                                <div className="field">
                                    <input type="password" placeholder="Confirm password" required value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                </div>
                                {!passwordsMatch && (
                                    <div style={{ color: 'red' }}>Passwords do not match</div>
                                )}
                                <div className="field btn">
                                    <div className="btn-layer" />
                                    <input type="submit" defaultValue="Signup" />
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
