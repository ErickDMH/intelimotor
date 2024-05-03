import axios from "axios"
import axiosRetry from 'axios-retry'

const instance = axios.create({
  baseURL: "http://localhost:4500/publication",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosRetry(instance, { 
  retries: 3,
  retryDelay: (...arg) => axiosRetry.exponentialDelay(...arg, 1000),
  retryCondition(error) {
   switch (error?.response?.status) {
     case 500:
     case 501:
       return true;
     default:
       return false;
     }
   },
});

export default instance;
