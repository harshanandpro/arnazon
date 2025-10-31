import React, { useState } from 'react'
import './Login.css'
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { auth } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  // Email/Password Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', userCredential.user);
      navigate('/'); // Redirect to home page
    } catch (error) {
      setError(error.message);
      console.error('Error signing up:', error);
    } finally {
      setLoading(false);
    }
  };

  // Email/Password Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
      navigate('/'); // Redirect to home page
    } catch (error) {
      setError(error.message);
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google sign in successful:', result.user);
      navigate('/'); // Redirect to home page
    } catch (error) {
      setError(error.message);
      console.error('Error with Google sign in:', error);
    } finally {
      setLoading(false);
    }
  };

  // GitHub Sign In
  const handleGithubSignIn = async () => {
    setLoading(true);
    setError('');
    const provider = new GithubAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      console.log('GitHub sign in successful:', result.user);
      navigate('/'); // Redirect to home page
    } catch (error) {
      setError(error.message);
      console.error('Error with GitHub sign in:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login__page">
      <div className="login__container">
        <div className="login__card">
          <div className="card__header">
            <h1 className="login__title">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="login__subtitle">
              {isSignUp 
                ? 'Sign up to get started' 
                : 'Sign in to continue shopping'}
            </p>
          </div>

          {error && <div className="error__message">{error}</div>}

          <form className="login__form" onSubmit={isSignUp ? handleSignUp : handleSignIn}>
            {isSignUp && (
              <div className="form__group">
                <label className="form__label">Full Name</label>
                <div className="input__wrapper">
                  <FaUser className="input__icon" />
                  <input 
                    type="text" 
                    className="form__input"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form__group">
              <label className="form__label">Email Address</label>
              <div className="input__wrapper">
                <FaUser className="input__icon" />
                <input 
                  type="email" 
                  className="form__input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form__group">
              <label className="form__label">Password</label>
              <div className="input__wrapper">
                <FaLock className="input__icon" />
                <input 
                  type={showPassword ? "text" : "password"}
                  className="form__input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="password__toggle" onClick={togglePassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {!isSignUp && (
              <div className="form__options">
                <label className="remember__me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot__password">Forgot Password?</a>
              </div>
            )}

            <button type="submit" className="submit__btn" disabled={loading}>
              {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </button>
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="social__login">
            <button className="social__btn" onClick={handleGoogleSignIn} disabled={loading}>
              <FcGoogle className="social__icon" />
              Google
            </button>
            <button className="social__btn" onClick={handleGithubSignIn} disabled={loading}>
              <FaGithub className="social__icon" />
              GitHub
            </button>
          </div>

          <div className="form__footer">
            <p>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <span className="toggle__link" onClick={toggleForm}>
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
