import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuthenticateMutation } from './feautures/api/apiSlice';
import { setAuthData } from './feautures/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [authenticate, { isLoading }] = useAuthenticateMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await authenticate({}).unwrap(); 
      console.log(response)
      dispatch(setAuthData({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        userId: response.user.id,
      }));
      navigate('/');
    } catch (error) {
      console.error('Failed to authenticate:', error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="p-8 bg-white rounded-lg shadow-lg max-w-sm w-full"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Get Started</h2>
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${isLoading ? 'bg-gray-400' : 'bg-green-500'} transition-colors duration-300`}
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
