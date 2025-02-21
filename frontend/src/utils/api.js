import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Adjust the base URL as needed
  withCredentials: true,
});

// Function to fetch articles from a specific newspaper
export const fetchArticlesFromSource = async (source) => {
  const response = await api.get(`/news?source=${source}`);
  return response.data;
};

export default api;
