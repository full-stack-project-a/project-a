import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';
const TEST_USER_ID = '6577a7f2a4603ab4ef7cbd50';

// Place order for a user
export const placeOrder = async (userId, token) => {
    return axios.post(`${API_BASE_URL}/order/${userId}`, {
        headers: {
           Authorization: `Bearer ${token}` // Include the JWT token here
        }
     });
};