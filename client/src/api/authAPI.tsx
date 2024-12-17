import { UserLogin } from "../interfaces/UserLogin";
import axios from 'axios';

const login = async (userInfo: UserLogin) => {
  try {
    const response = await axios.post('http://localhost:3001/auth/login', userInfo);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { login };