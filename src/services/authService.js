const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.full_name - User's full name
 * @param {string} userData.email - User's email
 * @param {string} userData.password - User's password
 * @param {string} userData.confirm_password - Password confirmation
 * @returns {Promise<Object>} - Response with user data and token
 */
export async function register(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      full_name: userData.full_name,
      email: userData.email,
      password: userData.password,
      confirm_password: userData.confirm_password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  // Store token in localStorage for authenticated requests
  if (data.data?.token) {
    localStorage.setItem('sapi_token', data.data.token);
    localStorage.setItem('sapi_current_user', JSON.stringify(data.data.user));
  }

  return data;
}

/**
 * Login user
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User's email
 * @param {string} credentials.password - User's password
 * @returns {Promise<Object>} - Response with user data and token
 */
export async function login(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  // Store token in localStorage
  if (data.data?.token) {
    localStorage.setItem('sapi_token', data.data.token);
    localStorage.setItem('sapi_current_user', JSON.stringify(data.data.user));
  }

  return data;
}

/**
 * Logout user - clear stored token
 */
export function logout() {
  localStorage.removeItem('sapi_token');
  localStorage.removeItem('sapi_current_user');
}

/**
 * Get current auth token
 * @returns {string|null} - The auth token or null
 */
export function getToken() {
  return localStorage.getItem('sapi_token');
}

/**
 * Check if user is authenticated
 * @returns {boolean} - True if user has a token
 */
export function isAuthenticated() {
  return !!getToken();
}

/**
 * Get current user data
 * @returns {Object|null} - Current user data or null
 */
export function getCurrentUser() {
  const user = localStorage.getItem('sapi_current_user');
  return user ? JSON.parse(user) : null;
}
