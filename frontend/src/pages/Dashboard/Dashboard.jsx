import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import NewsCard from '../../components/NewsCard/NewsCard';

const Dashboard = () => {
  const { savedArticles } = useSelector((state) => state.news); // Fetch saved articles from the Redux store

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <Typography variant="body1">
        Here you can view your saved articles and notes.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {savedArticles.length > 0 ? (
          savedArticles.map((article) => (
            <NewsCard key={article.url} article={article} />
          ))
        ) : (
          <Typography variant="body2">No saved articles found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
