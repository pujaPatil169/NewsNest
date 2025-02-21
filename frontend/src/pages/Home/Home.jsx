import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticlesFromSource, fetchRSSFeeds } from '../../store/newsSlice';
import NewsCard from '../../components/NewsCard/NewsCard.jsx'; // Updated import statement
import Loader from '../../components/Loader/Loader';
import { Box, TextField, MenuItem, Select } from '@mui/material';

const Home = () => {
  const dispatch = useDispatch();
  const { articleSource, rssFeeds, status, currentPage } = useSelector((state) => state.news);
  const [loadingMore, setLoadingMore] = useState(false);
  const [source, setSource] = useState('bbc-news'); // Default source
  const [category, setCategory] = useState('bbc-news'); // Define category state
  const [searchQuery, setSearchQuery] = useState('');
console.log('articleSource from home',articleSource)
  useEffect(() => {
    if (source === 'rss') {
      dispatch(fetchRSSFeeds());
    } else {
      dispatch(fetchArticlesFromSource(source));
    }
  }, [dispatch, source]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loadingMore) return;
    setLoadingMore(true);
    dispatch(fetchArticlesFromSource(source)); // Fetch more articles from the selected source
    setLoadingMore(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore]);

  if (status === 'loading') {
    return <Loader />;
  }

  const filteredArticles = articleSource.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Select
        value={source}
        onChange={(e) => setSource(e.target.value)}
        displayEmpty
        sx={{ mb: 2 }}
      >
        <MenuItem value="bbc-news">bbc-news</MenuItem>
        <MenuItem value="abc-news">abc-news</MenuItem>
        <MenuItem value="cbc-news">cbc-news</MenuItem>
        <MenuItem value="nbc-news">nbc-news</MenuItem>
        <MenuItem value="fox-news">fox-news</MenuItem>  
        <MenuItem value="the-washington-post">the-washington-post</MenuItem>
        <MenuItem value="the-new-york-times">the-new-york-times</MenuItem>
        <MenuItem value="usa-today">usa-today</MenuItem>
        <MenuItem value="the-guardian">the-guardian</MenuItem>
        <MenuItem value="reuters">reuters</MenuItem>
        <MenuItem value="associated-press">associated-press</MenuItem>
        <MenuItem value="bloomberg">bloomberg</MenuItem>
        <MenuItem value="business-insider">business-insider</MenuItem>
        <MenuItem value="cnbc">cnbc</MenuItem>
        <MenuItem value="financial-post">financial-post</MenuItem>
        {/* <MenuItem value="the-economist">the-economist</MenuItem> */}
        <MenuItem value="the-hill">the-hill</MenuItem>
        <MenuItem value="the-huffington-post">the-huffington-post</MenuItem>
        <MenuItem value="the-verge">the-verge</MenuItem>
        <MenuItem value="wired">wired</MenuItem>
        <MenuItem value="techcrunch">techcrunch</MenuItem>
        <MenuItem value="ars-technica">ars-technica</MenuItem>
        <MenuItem value="engadget">engadget</MenuItem>
        <MenuItem value="hacker-news">hacker-news</MenuItem>
        <MenuItem value="mashable">mashable</MenuItem>
        <MenuItem value="buzzfeed">buzzfeed</MenuItem>
        <MenuItem value="espn">espn</MenuItem>
        <MenuItem value="rss">RSS Feeds</MenuItem>
        <MenuItem value="nfl-news">nfl-news</MenuItem>
        <MenuItem value="nhl-news">nhl-news</MenuItem>
        <MenuItem value="nba-news">nba-news</MenuItem>
        <MenuItem value="mlb-news">mlb-news</MenuItem>
        <MenuItem value="bleacher-report">bleacher-report</MenuItem>
        <MenuItem value="bbc-sport">bbc-sport</MenuItem>
        <MenuItem value="espn-cric-info">espn-cric-info</MenuItem>
        <MenuItem value="talksport">talksport</MenuItem>
        <MenuItem value="national-geographic">national-geographic</MenuItem>
        <MenuItem value="the-wall-street-journal">the-wall-street-journal</MenuItem>
        <MenuItem value="time">time</MenuItem>
        <MenuItem value="cnn">cnn</MenuItem>
        <MenuItem value="fortune">fortune</MenuItem>
\      </Select>
      <TextField
        label="Search Articles"
        value={searchQuery}
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {source === 'rss' ? (
          rssFeeds.flatMap(feed => 
            feed.articles.map(article => (
              <NewsCard key={article.link} article={{ ...article, source: feed.source }} />
            ))
          )
        ) : (
          filteredArticles.map((article) => (
            <NewsCard key={article.url} article={article} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default Home;
