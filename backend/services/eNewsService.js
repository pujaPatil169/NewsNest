import axios from "axios";
import xml2js from "xml2js";

// Newspaper RSS Feed URLs
const rssFeeds = [
    { name: "Times of India", url: "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms" },
    { name: "The Hindu", url: "https://www.thehindu.com/news/national/feeder/default.rss" },
    { name: "Indian Express", url: "https://indianexpress.com/feed/" },
    { name: "Hindustan Times", url: "https://www.hindustantimes.com/feeds/rss/latest/rssfeed.xml" },
    { name: "Economic Times", url: "https://economictimes.indiatimes.com/rssfeedsdefault.cms" }
  ];

// https://indianexpress.com/section/india/
  // Function to fetch and parse RSS feeds
// Old implementation - preserved for reference
// const fetchRSSFeed = async (url) => {
//     try {
//       const { data } = await axios.get(url);
//       const result = await xml2js.parseStringPromise(data);
//       console.log('result.rss.channel[0] in enewsserivice ',result.rss.channel[0]);
//       console.log('result.rss.channel[0].item[0] ',result.rss.channel[0].item[0]);
//       const articles = result.rss.channel[0].item.map((item) => ({
//         title: item.title[0],
//         link: item.link[0],
//         description: item.description ? item.description[0] : "No description",
//         pubDate: item.pubDate ? item.pubDate[0] : "Unknown date",
//         image: item['media:content'] ? item['media:content'][0].$.url : 
//                (item.enclosure && item.enclosure[0].$.type.startsWith('image/') ? item.enclosure[0].$.url :
//                (item.image ? item.image[0].url : null))
//       }));
//       return articles;
//     } catch (error) {
//       console.error("Error fetching RSS feed:", error);
//       return [];
//     }
// };


// const fetchRSSFeed = async (url) => {
//   try {

    //---above two lines are temporarilyi commented 
//     const { data } = await axios.get(url);
//     const result = await xml2js.parseStringPromise(data);
//     console.log('result.rss.channel[0] in enewsserivice ',result.rss.channel[0])
//           console.log('result.rss.channel[0].item[0] ',result.rss.channel[0].item[0]);
//           console.log('result.rss.channel[0].item[0]. ',result.rss.channel[0].item[0]);

//         // Get channel image URL
//         const channelImage = result.rss.channel[0].image?.[0];
//         const channelImageUrl = channelImage?.url?.[0] || null;
//     const articles = result.rss.channel[0].item.map((item, index) => {
      // Add unique ID for each article
      // const articleId = `${newspaperSource}-${index}-${Date.now()}`;
//       // Improved image extraction
//       let imageUrl = null;
      
//       // Check multiple possible image locations
//       if (item.image?.[0]) {
//         // Fallback: Extract first image from description HTML
//         const imgMatch = item.image?.[0];
//         console.log('image url in enewsservice final else if ',imgMatch);
//         imageUrl = imgMatch ? imgMatch : null;
//         // imageUrl = imgMatch ? imgMatch[1] : null;
//       }
//       else if (item['media:content']?.[0]?.$?.url) {
//         imageUrl = item['media:content'][0].$.url;
//       } else if (item.enclosure?.[0]?.$?.url) {
//         imageUrl = item.enclosure[0].$.url;
//       } else if (item['media:thumbnail']?.[0]?.$?.url) {
//         imageUrl = item['media:thumbnail'][0].$.url;
//       } else if (item.description?.[0]) {
//         // Fallback: Extract first image from description HTML
//         const imgMatch = item.description[0].match(/<img[^>]+src="([^">]+)"/);
//         imageUrl = imgMatch ? imgMatch[1] : null;
//       }else if (item['media:content']?.[0]?.$?.url) {
//                   imageUrl = item['media:content'][0].$.url;
//                             guid: item.guid?.[0]?._ || item.guid?.[0] || null // Add GUID for unique identification
//                         }
//      else if (item.image?.[0]) {
//         // Fallback: Extract first image from description HTML
//         const imgMatch = item.image?.[0];
//         console.log('image url in enewsservice final else if ',imgMatch);
//         imageUrl = imgMatch ? imgMatch : null;
//         // imageUrl = imgMatch ? imgMatch[1] : null;
//       }
// console.log('image url in service',imageUrl);
//       return {
//         title: item.title?.[0] || 'No title',
//         link: item.link?.[0] || '#',
//         description: item.description?.[0] || "No description",
//         pubDate: item.pubDate?.[0] || "Unknown date",
//         image: imageUrl,
//         content: item['content:encoded']?.[0] || ''
//       };
//     });
    
//-----------below code is temporarily commented out----------------
// const { data } = await axios.get(url);
// const result = await xml2js.parseStringPromise(data);

// const channelImage = result.rss.channel[0]?.image?.[0]?.url?.[0] || null;

// const articles = result.rss.channel[0].item.map((item) => {
//   // Image extraction logic
//   let imageUrl = null;
  
//   // Check media content first
//   if (item['media:content']?.[0]?.$?.url) {
//     imageUrl = item['media:content'][0].$.url;
//   }
//   // Then check enclosures
//   else if (item.enclosure?.[0]?.$?.url) {
//     imageUrl = item.enclosure[0].$.url;
//   }
//   // Extract from description HTML
//   else if (item.description?.[0]) {
//     const imgMatch = item.description[0].match(/<img[^>]+src=(["'])(.*?)\1/i);
//     imageUrl = imgMatch?.[2] || null;
//   }
  
//   // Fallback to channel image
//   if (!imageUrl && channelImage) {
//     imageUrl = channelImage;
//   }

//   return {
//     title: item.title?.[0]?.trim() || 'No title',
//     link: item.link?.[0] || '#',
//     description: item.description?.[0] || "No description",
//     pubDate: item.pubDate?.[0] || "Unknown date",
//     image: imageUrl || '/images/news-placeholder.png',
//     content: item['content:encoded']?.[0] || ''
//   };
// });
    
// return articles;
//   } catch (error) {
//     console.error("Error fetching RSS feed:", error);
//     return [];
//   }
// };





//-----------------------------------------------

const fetchRSSFeed = async (url) => {
  try {
    const { data } = await axios.get(url);
    const result = await xml2js.parseStringPromise(data);

    const channel = result.rss.channel[0];
    const channelImage = channel.image?.[0]?.url?.[0] || null;

    const articles = channel.item.map((item) => {
      let imageUrl = null;

      // Check for media:content
      if (item['media:content']?.[0]?.$?.url) {
        imageUrl = item['media:content'][0].$.url;
      }
      // Check for media:thumbnail
      else if (item['media:thumbnail']?.[0]?.$?.url) {
        imageUrl = item['media:thumbnail'][0].$.url;
      }
      // Check for enclosure
      else if (item.enclosure?.[0]?.$?.url) {
        imageUrl = item.enclosure[0].$.url;
      }
      // Extract from description HTML
      else if (item.description?.[0]) {
        const imgMatch = item.description[0].match(/<img[^>]+src=(["'])(.*?)\1/i);
        imageUrl = imgMatch?.[2] || null;
      }

      // Fallback to channel image
      if (!imageUrl && channelImage) {
        imageUrl = channelImage;
      }

      return {
        title: item.title?.[0]?.trim() || 'No title',
        link: item.link?.[0] || '#',
        description: item.description?.[0] || 'No description',
        pubDate: item.pubDate?.[0] || 'Unknown date',
        image: imageUrl || '/images/news-placeholder.png',
        content: item['content:encoded']?.[0] || '',
      };
    });

    return articles;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
};

//---------------------------------------------

// const fetchRSSFeed = async (url) => {
//   try {
//     const { data } = await axios.get(url, {
//       timeout: 10000, // 10 second timeout
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
//         'Accept': 'application/rss+xml, application/xml, text/xml'
//       }
//     });


//         // Configure XML parser with better error handling
//     const parser = new xml2js.Parser({
//       explicitArray: false,
//       normalizeTags: true,
//       trim: true,
//       ignoreAttrs: false,
//       mergeAttrs: true,
//       explicitCharkey: true
//     });


//     const result = await parser.parseStringPromise(data);

//     // Validate RSS feed structure
//     if (!result?.rss?.channel?.[0]?.item) {
//       console.error(`Invalid RSS feed structure from ${url}`);
//       return [];
//     }

//     // Map items with improved image handling
//     const articles = result.rss.channel[0].item.map((item) => {
//       try {
//         // Extract image from various possible sources
//         let imageUrl = null;
        
//         // Check for media:content
//         if (item['media:content']?.[0]?.$?.url) {
//           imageUrl = item['media:content'][0].$.url;
//                     guid: item.guid?.[0]?._ || item.guid?.[0] || null // Add GUID for unique identification
//                 };
//             } catch (itemError) {
//                 console.error(`Error processing RSS item from ${url}:`, itemError);
//                 return null;
//             }
//         }).filter(Boolean); // Remove any null items from failed processing

//         return articles;
//     } catch (error) {
//         console.error(`Error fetching RSS feed from ${url}:`, {
//             message: error.message,
//             url: url,
//             stack: error.stack
//         });
//         return [];
//     }
// };

  // result in enewsserivice  {
  //   '$': {
  //     'xmlns:atom': 'http://www.w3.org/2005/Atom',
  //   },
  //   channel: [
  //     {
  //       'atom:link': [Array],
  //       title: [Array],
  //       link: [Array],
  //       description: [Array],
  //       category: [Array],
  //       ttl: [Array],
  //       lastBuildDate: [Array],
  //       copyright: [Array],
  //       language: [Array],
  //       docs: [Array],
  //       image: [Array],
  //       item: [Array]
  //     }
  //   ]
  // }
// const fetchRSSFeed = async (url) => {
//   try {
//       const { data } = await axios.get(url);
//       // console.log(`🔍 RAW RSS Data from ${url}:`, data); // Log raw XML response

//       const parser = new xml2js.Parser({
//           explicitArray: false, // To avoid excessive nested arrays
//           charkey: "_", // Prevents issues with character encoding
//           normalizeTags: true, // Normalize tag names
//           normalize: true, // Normalize whitespace
//           trim: true // Trim whitespace
//       });

//       const result = await parser.parseStringPromise(data);
//       // console.log(` Parsed RSS Data from ${url}:`, result);

//       if (!result.rss || !result.rss.channel || !result.rss.channel.item) {
//           console.warn(` No articles found for ${url}`);
//           return [];
//       }

//       return result.rss.channel.item.map((item) => ({
//           title: item.title ? item.title[0] : "No title",
//           link: item.link ? item.link[0] : "#",
//           description: item.description ? item.description[0] : "No description",
//           pubDate: item.pubDate ? item.pubDate[0] : "Unknown date",
//       }));
//   } catch (error) {
//       console.error(` Error fetching RSS feed from ${url}:`, error.message);
//       return [];
//   }
// };

// const fetchRSSFeed = async (url) => {
//   try {
//     const { data } = await axios.get(url, {
//       headers: {
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
//       },
//     });

//     console.log(`🔍 RAW RSS Data from ${url}:`, data); // Log raw XML response

//     const result = await xml2js.parseStringPromise(data);

//     if (!result.rss || !result.rss.channel || !result.rss.channel[0].item) {
//       console.warn(` No articles found for ${url}`);
//       return [];
//     }

//     return result.rss.channel[0].item.map((item) => ({
//       title: item.title[0],
//       link: item.link[0],
//       description: item.description ? item.description[0] : "No description",
//       pubDate: item.pubDate ? item.pubDate[0] : "Unknown date",
//     }));
//   } catch (error) {
//     console.error(`Error fetching RSS feed from ${url}:`, error.message);
//     return [];
//   }
// };


// Fixing malformed XML by replacing problematic characters

// const cleanXML = (xml) => {
//   return xml
//     .replace(/(=\w+)/g, (match) => `${match.charAt(0)} "${match.slice(1)}"` ) // Ensure attribute values are quoted
//     .replace(/(<\w+)(\w+=)/g, "$1 $2") // Add missing spaces between attributes
//     .replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, "&amp;"); // Fix unescaped &
// };

// const fetchRSSFeed = async (url) => {
//   try {
//     const { data } = await axios.get(url, {
//       headers: {
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
//         Accept: "application/rss+xml, application/xml, text/xml",
//       },
//       responseType: "text",
//     });

//     const cleanedXML = cleanXML(data); // Fix XML issues

//     const parser = new xml2js.Parser({
//       explicitArray: false,
//       normalizeTags: true,
//       normalize: true,
//       trim: true,
//     });

//     const result = await parser.parseStringPromise(cleanedXML);

//     if (!result.rss || !result.rss.channel || !result.rss.channel.item) {
//       console.warn(` No articles found for ${url}`);
//       return [];
//     }

//     return result.rss.channel.item.map((item) => ({
//       title: item.title || "No title",
//       link: item.link || "#",
//   } catch (error) {
//     console.error(` Error fetching RSS feed from ${url}:`, error.message);
//     return [];
//   }
// };
export default fetchRSSFeed;
