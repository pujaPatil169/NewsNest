import { Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import { Bookmark, BookmarkBorder, Download } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveArticle } from '../../store/newsSlice.js'; // Updated import

import { useNavigate } from 'react-router-dom';

const NewsCard = ({ article }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const dispatch = useDispatch();
// console.log('article in newcard',article)
  // const title = article.title || article.headline;
  // const description = article.description || article.summary;
  const image = article.image || article.urlToImage || "https://via.placeholder.com/150";
  const content = article.content
  const source = article.source.name||""
  // const url = article.url || article.link;
  const handleSave = () => {
    setSaved(!saved);
    dispatch(saveArticle(article)); // Dispatch save action
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = article.url; // Use the article URL for downloading
    link.download = `${article.title}.pdf`; // Set the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
    <Card sx={{ maxWidth: 345, m: 2 }} onClick={() => navigate(`/articles/${article.publishedAt}`,{state : {article}})}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        // image={article.urlToImage}
        alt={article.title}
        sx={{ objectFit: "cover", display: "block" }}

      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {article.title}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>

        <Typography variant="body2" color="text.secondary">
            <h6 style={{color:"black"}}>Description </h6>
          {article.description}
        </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          <h6 style={{color:'black'}}>Content</h6>
          {content}
        </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          <h6 style={{color:'black'}}>Source</h6>
          {source}
        </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <IconButton onClick={handleSave}>
            {saved ? <Bookmark color="primary" /> : <BookmarkBorder />}
          </IconButton>
          <IconButton onClick={handleDownload}>
            <Download />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
    
    </>
    
  );
};

export default NewsCard;
