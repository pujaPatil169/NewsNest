import { redisClient } from "../config/redis.js";
import fetchRSSFeed from "../services/eNewsService.js";

// Function to fetch and parse RSS feeds
const rssFeeds = [
  {
    name: "Times of India",
    url: "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",
  },
  {
    name: "The Hindu",
    url: "https://www.thehindu.com/news/national/feeder/default.rss",
  },
  // {
  //   name: "Indian Express",
  //   url: "https://indianexpress.com/section/india/feed/",
  // },
  // {
  //   name: "Hindustan Times",
  //   url: "https://www.hindustantimes.com/rss/india/rssfeed.xml",
  // },
  {
    name: "Economic Times",
    url: "https://economictimes.indiatimes.com/rssfeedsdefault.cms",
  },
];

export const fetchAllRSSFeed = async (req, res) => {
  const { newspaperName } = req.params;
  console.log('newspaper name in fetchAllRSSFeed of controller', newspaperName);
  try {
    // Check if cached data exists
    // Cache key per source
    // const cacheKey = `newsData:${newspaperName}`;
    const cacheKey = `newsData`;
    // const cachedData = await redisClient.get(cacheKey);

    // if (cachedData) {
    //   // console.log("Serving from Cache for enewspapers" ,cachedData);
    //   console.log('serving form cashed data in enewscontroller')
    //   return res.json(JSON.parse(cachedData));
    // }
//----------------------------------------------------------to fetch single newspaper------------------------
    // // Find the requested newspaper feed
    // const newspaperFeed = rssFeeds.find(feed => 
    //   feed.name.toLowerCase() === newspaperName.toLowerCase()
    // );

    // if (!newspaperFeed) {
    //   return res.status(404).json({ error: "Newspaper not found" });
    // }

    // // Fetch news for the specific newspaper
    // const articles = await fetchRSSFeed(newspaperFeed.url);

    // // Prepare response data
    // const newsData = {
    //   source: newspaperFeed.name,
    //   articles: articles
    // };
//----------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------to fetch all----------------------------------------------------

    // Fetch news from all sources
    const newsPromises = rssFeeds.map((feed) => fetchRSSFeed(feed.url));
    const newsResults = await Promise.all(newsPromises);

    // Combine results from all sources
    const allNews = rssFeeds.map((feed, index) => ({
      source: feed.name,
      articles: newsResults[index],
    }));
    // Cache the response for 10 minutes
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(allNews));

    res.json(allNews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
};




    // // Cache the response for 10 minutes
    // await redisClient.setEx("cacheKey", 3600, JSON.stringify(allNews));

    // res.json(allNews);

    
// export const fetchAllRSSFeed = async (req, res) => {
//     try {
//       // Check if cached data exists
//       const cachedData = await redisClient.get("newsData");
//       if (cachedData) {
//         console.log("Serving from Cache");
//         return res.json(JSON.parse(cachedData));
//       }

//       // Fetch news from all sources
//       const newsPromises = rssFeeds.map(feed => fetchRSSFeed(feed.url));
//       const newsResults = await Promise.all(newsPromises);

//       // Combine results from all sources
//       const allNews = rssFeeds.map((feed, index) => ({
//         source: feed.name,
//         articles: newsResults[index],
//       }));

//       // Cache the response for 10 minutes
//       await redisClient.setEx("newsData", 600, JSON.stringify(allNews));

//       res.json(allNews);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch news" });
//     }
//   };
