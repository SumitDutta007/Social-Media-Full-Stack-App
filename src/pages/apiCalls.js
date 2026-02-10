import axiosInstance from '../axios.js';

export const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: 'LOGIN_START' });
    try {
        const res = await axiosInstance.post('/api/auth/login', userCredentials);
        
        // Store JWT token in localStorage
        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
        }
        
        // Store user data (without password)
        if (res.data.user) {
            localStorage.setItem('user', JSON.stringify(res.data.user));
        }
        
        // Dispatch with user data
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user });
    } catch (err) {
        dispatch({ type: 'LOGIN_FAILURE', payload: err });
        
        // Show user-friendly error message
        const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
        alert(errorMessage);
    }
}

export const registerCall = async (userCredentials, dispatch) => {
    dispatch({ type: 'LOGIN_START' });
    try {
        const res = await axiosInstance.post('/api/auth/register', userCredentials);
        
        // Store JWT token in localStorage
        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
        }
        
        // Store user data (without password)
        if (res.data.user) {
            localStorage.setItem('user', JSON.stringify(res.data.user));
        }
        
        // Dispatch with user data
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user });
        
        // Show success message
        alert('Registration successful! Welcome to SociaMed.');
    } catch (err) {
        dispatch({ type: 'LOGIN_FAILURE', payload: err });
        
        // Show user-friendly error message
        const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
        alert(errorMessage);
    }
}
