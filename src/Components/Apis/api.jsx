// api.js

import axios from 'axios';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/signup/${role}', userData);
    return response.data; // Assuming the response contains a token
  } catch (error) {
    throw error.response.data;
  }
};

export const otherFunction = () => {
  // Other functions if any
};
