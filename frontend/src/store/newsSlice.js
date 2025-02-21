import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching media content
export const fetchMediaContent = createAsyncThunk(
  'news/fetchMediaContent',
  async () => {
    const response = await axios.get('/api/news/media', { withCredentials: true });
    return response.data;
  }
);

export const fetchRSSFeeds = createAsyncThunk('news/fetchRSSFeeds', async () => {
  const response = await axios.get('http://localhost:4000/api/news/E-News', { withCredentials: true });
  return response.data;
});

export const fetchNewsByCategory = createAsyncThunk('news/fetchNewsByCategory', async ({ category, country }) => {
  const response = await axios.get(`http://localhost:4000/api/news/category?category=${category}&country=${country}`,{ withCredentials: true });
  return response.data;
});

export const saveArticle = createAsyncThunk('news/saveArticle', async (article) => {
  return article;
});

export const fetchArticlesFromSource = createAsyncThunk('news/fetchArticlesFromSource', async (source) => {
  const response = await axios.get(`http://localhost:4000/api/news/source?source=${source}`,{ withCredentials: true });
  return response.data;
});

export const commentOnArticle = createAsyncThunk('news/commentOnArticle', async ({ articleId, comment }) => {
  return { articleId, comment };
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    articleSource: [],
    savedArticles: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 1,
    comments: {},
    rssFeeds: [],
    result: {},
    mediaContent: {
      videos: [],
      highlights: [],
      status: 'idle',
      error: null
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMediaContent.pending, (state) => {
        state.mediaContent.status = 'loading';
      })
      .addCase(fetchMediaContent.fulfilled, (state, action) => {
        state.mediaContent.status = 'succeeded';
        state.mediaContent.videos = action.payload.videos || [];
        state.mediaContent.highlights = action.payload.highlights || [];
      })
      .addCase(fetchMediaContent.rejected, (state, action) => {
        state.mediaContent.status = 'failed';
        state.mediaContent.error = action.error.message;
      })
      .addCase(fetchRSSFeeds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRSSFeeds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rssFeeds = action.payload;
      })
      .addCase(fetchRSSFeeds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchNewsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNewsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload?.articles || [];
        state.currentPage = action.payload?.currentPage || 1;
        state.totalPages = action.payload?.totalPages || 1;
      })
      .addCase(fetchNewsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchArticlesFromSource.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticlesFromSource.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articleSource = action.payload?.articles || [];
        state.currentPage = action.payload?.currentPage || 1;
        state.totalPages = action.payload?.totalPages || 1;
      })
      .addCase(fetchArticlesFromSource.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveArticle.fulfilled, (state, action) => {
        state.savedArticles.push(action.payload);
      })
      .addCase(commentOnArticle.fulfilled, (state, action) => {
        const { articleId, comment } = action.payload;
        if (!state.comments[articleId]) {
          state.comments[articleId] = [];
        }
        state.comments[articleId].push(comment);
      });
  },
});

export default newsSlice.reducer;
