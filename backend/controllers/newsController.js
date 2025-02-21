import { fetchTopHeadlinesByCategory, fetchTopHeadlinesBySource, fetchMediaContent } from '../services/newsService.js';

export const fetchNewsByCategory = async (req, res) => {
  const { category, country, page = 1, pageSize = 10 } = req.query; // Get the category, country and pagination params
  console.log('category in controller', category);
  console.log('country in controller', country);
  try {
    const news = await fetchTopHeadlinesByCategory(category, country, parseInt(page), parseInt(pageSize));
    // }else{
    //   console.log('inside source controller',source)
    //   const news = await fetchTopHeadlinesBySource(source); // Fetch news by source
    // }
    console.log('category contrllower returend article/news',news);
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news', error });
  }
};




export const fetchNewsBySource = async (req, res) => {
  const { source, page = 1, pageSize = 10 } = req.query; // Get the source and pagination params
  try {
    const news = await fetchTopHeadlinesBySource(source, parseInt(page), parseInt(pageSize));
    res.json(news);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching news', error });
      }
      };

export const getMediaContent = async (req, res) => {
  try {
    const mediaContent = await fetchMediaContent();
    res.json({
      videos: mediaContent.videos || [],
      highlights: mediaContent.highlights || []
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching media content', error });
  }
};
