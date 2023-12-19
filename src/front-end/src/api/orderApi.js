import axios from 'axios';

const API_BASE_URL = '/api/v1';

// Place order for a user
export const placeOrder = async (userId, token) => {
    return axios.post(`${API_BASE_URL}/order/${userId}`, {
        headers: {
           Authorization: `Bearer ${token}` // Include the JWT token here
        }
     });
};