// import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {  useSelector } from 'react-redux';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchRSSFeeds } from '../../store/newsSlice';
import { Box, Typography } from '@mui/material';
import Loader from '../../components/Loader/Loader';
import ENEWSCard from '../../components/ENEWSCard/ENEWSCard';

const NewspaperDetailPage = () => {
  const { newspaperName } = useParams();
  const location = useLocation();
  // const dispatch = useDispatch();
  const { rssFeeds, status } = useSelector((state) => state.news);
  // const {  status } = useSelector((state) => state.news);
  const feed = location.state?.feed;
console.log('rssfedds from the state in the slice ', rssFeeds);
console.log('feed passed form newspaperPage component',feed);
  // useEffect(() => {
  //   dispatch(fetchRSSFeeds());
  // }, [dispatch]);

  if (status === 'loading') {
    return <Loader />;
  }

  const selectedFeed = feed || []
   || rssFeeds.find(feed => 
    feed.source.toLowerCase().replace(/\s+/g, '-') === newspaperName.toLowerCase()
  );
  console.log('selectedFeed from newspaperDetailPage',selectedFeed);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {selectedFeed ? selectedFeed.source : 'Newspaper Not Found'}
      </Typography>
      {selectedFeed ? (
        <Box sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center'
        }}>
          {selectedFeed.articles.map((article) => (
            <Box 
            key={`${article.title}-${article.pubDate}`} // Unique key
            sx={{
              width: { xs: '100%', sm: '48%', md: '31%' },
              maxWidth: 345
            }}>
              <ENEWSCard article={article} newspaperSource={selectedFeed.source} />
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">No articles available for this newspaper.</Typography>
      )}
    </Box>
  );
};

export default NewspaperDetailPage;
