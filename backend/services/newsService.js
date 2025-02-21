import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import { redisClient } from '../config/redis.js';

// Generate unique cache key with timestamp
const generateCacheKey = (baseKey) => {
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / (1000 * 60 * 60)); // Cache for 1 hour
  return `${baseKey}:${timestamp}`;
};

const BASE_URL_NEWSAPI = process.env.BASE_URL_NEWSAPI;
const BASE_URL_GNAPI = process.env.BASE_URL_GNAPI;

export const fetchTopHeadlinesByCategory = async (category, country, page = 1, pageSize = 10) => {
  const cacheKey = generateCacheKey(`news:${category}:${country}:${page}:${pageSize}`);

  try {
    // Check Redis cache first
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const response = await axios.get(`${BASE_URL_GNAPI}?category=${category}&country=${country}&max=30&apikey=${process.env.GN_API_KEY}`);
    const allArticles = response.data.articles;
    
    // Implement pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const articles = allArticles.slice(startIndex, endIndex);
    const totalPages = Math.ceil(allArticles.length / pageSize);

    // Cache the fetched articles in Redis for 1 hour
    const result = {
      articles,
      currentPage: page,
      totalPages,
      pageSize
    };
    
    await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 3600);
    return result;
  } catch (error) {
    console.error('Error fetching top headlines by category:', error);
    throw error;
  }
};

export const fetchTopHeadlinesBySource = async (source, page = 1, pageSize = 10) => {
  const cacheKey = generateCacheKey(`news:source:${source}:${page}:${pageSize}`);
  
  try {
    // Check Redis cache first
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const response = await axios.get(`${BASE_URL_NEWSAPI}?sources=${source}&apiKey=${process.env.NEWS_API_KEY}`);
    const allArticles = response.data.articles;
    
    // Implement pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const articles = allArticles.slice(startIndex, endIndex);
    const totalPages = Math.ceil(allArticles.length / pageSize);

    // Cache the fetched articles in Redis for 1 hour
    const result = {
      articles,
      currentPage: page,
      totalPages,
      pageSize
    };
    
    await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 3600);
    return result;
  } catch (error) {
    console.error('Error fetching top headlines by source:', error);
    throw error;
  }
};

export const fetchMediaContent = async () => {
  const cacheKey = generateCacheKey('media:content');
  
  try {
    // Check Redis cache first
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // Fetch trending news for highlights
    const newsResponse = await axios.get(`${BASE_URL_GNAPI}?max=5&apikey=${process.env.GN_API_KEY}`);
    const highlights = newsResponse.data.articles.map(article => article.title);

    // Fetch video content (example using YouTube API)
    const videoResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 3,
        q: 'news',
        type: 'video',
        key: process.env.YOUTUBE_API_KEY
      }
    });

    const videos = videoResponse.data.items.map(item => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/embed/${item.id.videoId}`
    }));

    const result = {
      videos,
      highlights
    };

    // Cache the result in Redis for 1 hour
    await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 3600);
    return result;
  } catch (error) {
    console.error('Error fetching media content:', error);
    throw error;
  }
};
