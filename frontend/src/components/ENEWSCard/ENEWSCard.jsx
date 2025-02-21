/**
 * ENEWSCard Component Documentation
 * 
 * This component displays a card for an e-newspaper article with:
 * - Article image
 * - Title
 * - Description
 * - Bookmark and download buttons
 * 
 * Key Concepts Used:
 * 1. Props: Data passed from parent component
 * 2. State: Internal component data that can change
 * 3. PropTypes: Type checking for component props
 * 4. Material-UI Components: Pre-built UI components
 */

import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Box } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { Bookmark, BookmarkBorder, Download } from '@mui/icons-material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import SkeletonLoader from '../Loader/SkeletonLoader';

/**
 * ENEWSCard Component
 * @param {Object} props - Component properties
 * @param {Object} props.article - Article data
 * @param {string} props.newspaperSource - Newspaper source name
 */
// const ENEWSCard = ({ article, newspaperSource, loading = false }) => {
//   // State to manage bookmark status
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   /**
//    * Handles bookmark button click
//    * Toggles bookmark status
//    */
//   const handleBookmarkClick = () => {
//     setIsBookmarked(!isBookmarked);
//   };

//   // Handle empty article case
//   if (!article) {
//     return (
//       <Card sx={{ maxWidth: 345, m: 2 }}>
//         <CardMedia
//           component="img"
//           height="140"
//           image="/images/placeholder.jpg"
//           alt="No articles available"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             No Articles Available
//           </Typography>
//         </CardContent>
//       </Card>
//     );
//   }

//   // Extract first paragraph from HTML description
//   const description = article.description?.match(/<p>(.*?)<\/p>/)?.[1] || '';
  
//   // Remove HTML tags from description
//   const cleanDescription = description.replace(/<[^>]+>/g, '');

//   return (
//     <Card sx={{ maxWidth: 345, m: 2 }}>
//       {/* Newspaper Image */}
//       <CardMedia
//         component="img"
//         height="140"
//         image={article.image}
//         // image={`/images/newspapers/${newspaperSource.toLowerCase()}.jpg`}
//         alt={newspaperSource}
//         onError={(e) => {
//           e.target.src = '/images/placeholder.jpg';
//         }}
//       />

//       {/* Card Content */}
//       <CardContent>
//         {/* Article Title */}
//         <Typography gutterBottom variant="h5" component="div">
//           {article.title}
//         </Typography>

//         {/* Article Description */}
//         <Typography variant="body2" color="text.secondary">
//           {/* {cleanDescription} */}
//           {article.description}
//         </Typography>

//         {/* Action Buttons */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//           {/* Bookmark Button */}
//           <IconButton onClick={handleBookmarkClick}>
//             {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
//           </IconButton>

//           {/* Download Button */}
//           <IconButton href={article.link} target="_blank" rel="noopener noreferrer">
//             <Download />
//           </IconButton>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// ENEWSCard.jsx - Optimized image component
const ENEWSCard = ({ article, newspaperSource, loading = false }) => {
  const [imgSrc, setImgSrc] = useState(article.image);
  
  // Handle image errors
  const handleImageError = () => {
    setImgSrc('/images/news-placeholder.png');
  };

  // Clean description text
  const cleanDescription = article?.description
    ?.replace(/<[^>]+>/g, '') // Remove HTML tags
    ?.replace(/&\w+;/g, '')   // Remove HTML entities
    ?.substring(0, 150) + '...';

  if (loading) {
    return (
      <Card sx={{ maxWidth: 345, m: 2, height: '100%' }}>
        <SkeletonLoader type="card" />
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 345, m: 2, height: '100%' }}>
      <CardMedia
        component="img"
        height="140"
        image={imgSrc}
        alt={article.title}
        onError={handleImageError}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent sx={{ height: 240, overflow: 'hidden' }}>
        <Typography gutterBottom variant="h6" component="div">
          {article.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          {cleanDescription}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <IconButton href={article.link} target="_blank">
          <OpenInNew />
        </IconButton>
        <Typography variant="caption" color="text.secondary">
          {new Date(article.pubDate).toLocaleDateString()}
        </Typography>
      </CardActions>
    </Card>
  );
};

// Prop Type Validation
ENEWSCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    link: PropTypes.string.isRequired,
    pubDate: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }),
  newspaperSource: PropTypes.string.isRequired,
  loading: PropTypes.bool
};

export default ENEWSCard;



//IMP note--- Also, in the NewspaperDetailPage, the selectedFeed is taken from location.state.feed, which is passed when navigating. But if the user refreshes the page, the state might be lost, causing the feed to be undefined. They might need to fetch the feed data again based on the newspaperName parameter.
