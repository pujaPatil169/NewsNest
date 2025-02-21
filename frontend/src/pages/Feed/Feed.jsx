import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsByCategory } from '../../store/newsSlice';
import NewsCard from '../../components/NewsCard/NewsCard.jsx'; // Updated import statement
import { Box, TextField, MenuItem, Select } from '@mui/material';

function Feed() {
  const { category } = useParams(); // Get the category from the URL
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.news);
  const state = useSelector((state) => state.news);
  
  const [selectedCountry, setSelectedCountry] = useState('us'); // Default country
  const countries = [
    { code: 'au', name: 'Australia' },
    { code: 'br', name: 'Brazil' },
    { code: 'ca', name: 'Canada' },
    { code: 'cn', name: 'China' },
    { code: 'eg', name: 'Egypt' },
    { code: 'fr', name: 'France' },
    { code: 'de', name: 'Germany' },
    { code: 'gr', name: 'Greece' },
    { code: 'hk', name: 'Hong Kong' },
    { code: 'in', name: 'India' },
    { code: 'ie', name: 'Ireland' },
    { code: 'il', name: 'Israel' },
    { code: 'it', name: 'Italy' },
    { code: 'jp', name: 'Japan' },
    { code: 'nl', name: 'Netherlands' },
    { code: 'no', name: 'Norway' },
    { code: 'pk', name: 'Pakistan' },
    { code: 'pe', name: 'Peru' },
    { code: 'ph', name: 'Philippines' },
    { code: 'pt', name: 'Portugal' },
    { code: 'ro', name: 'Romania' },
    { code: 'ru', name: 'Russian Federation' },
    { code: 'sg', name: 'Singapore' },
    { code: 'es', name: 'Spain' },
    { code: 'se', name: 'Sweden' },
    { code: 'ch', name: 'Switzerland' },
    { code: 'tw', name: 'Taiwan' },
    { code: 'ua', name: 'Ukraine' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'us', name: 'United States' }
];

  
  const [page, setPage] = useState(1); // Track the current page
console.log('articles in feed', articles);
console.log('articles in feed length',articles.length)
console.log('state in feed', state);
console.log('category in feed', category);
  useEffect(() => {
    console.log('dispatched by category from feed ')
    dispatch(fetchNewsByCategory({ category, country: selectedCountry })); // Dispatch action to fetch articles
  }, [category, selectedCountry, dispatch]);

  // const handleScroll = () => {
  //   if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
  //   setPage(prev => prev + 1); // Load more articles
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error fetching articles: {error.message}</div>;

  return (
    <Box sx={{ p: 3 }}

    >

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold capitalize">{category} News</h1>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="border rounded p-2"
        >
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      {/* <ul>
        {articles.map((article) => (
          <NewsCard key={article.title} article={article} /> // Use NewsCard for rendering articles
        ))}
      </ul> */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {articles.map((article) => (
          <NewsCard key={article.title} article={article} />
        ))}
      </Box>

    </Box>
  );
}

export default Feed;
