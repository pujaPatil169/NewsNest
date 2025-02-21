// import { Box, Typography } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import Comments from '../../components/Comments/Comments';

// const ArticleDetail = () => {
//   const { id } = useParams();

//   // Fetch article details using the id (this will be implemented later)

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Article Detail
//       </Typography>
//       <Typography variant="body1">
//         {/* Article details will be displayed here */}
//         Article ID: {id}
//       </Typography>
//       <Comments articleId={id} /> {/* Render Comments component */}
//     </Box>
//   );
// };

// export default ArticleDetail;


import { Card, CardMedia, CardContent, Typography, Container, Box, Button } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import LaunchIcon from "@mui/icons-material/Launch";
import { useLocation } from "react-router-dom";
import {  Stack,Paper } from "@mui/material";

const ArticleDetail = () => {
  const location = useLocation();
  const article = location.state?.article;
  const content = article.content;
  const image = article.image || article.urlToImage ;
  if (!article) return <Typography>No article found.</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb:2 }}>
    <Card sx={{ boxShadow: 3, borderRadius: 3, overflow: "hidden" }}>
      {/* Image Section */}
      <CardMedia
        component="img"
        height="400"
        image={image || "https://via.placeholder.com/800x400"}
        alt={article.title}
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ p: 3 }}>
        {/* Title */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {article.title}
        </Typography>

        {/* Metadata */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
            <PersonIcon sx={{ fontSize: 18, mr: 1 }} />
            {article.source?.name || "Unknown Source"}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
            <CalendarTodayIcon sx={{ fontSize: 18, mr: 1 }} />
            {new Date(article.publishedAt).toLocaleDateString() || "N/A"}
          </Typography>

          {article.category && (
            <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
              <CategoryIcon sx={{ fontSize: 18, mr: 1 }} />
              {article.category}
            </Typography>
          )}
        </Box>

        {/* Description */}
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          {article.description || "No description available."}
        </Typography>

      {content &&   <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 2 }}>
          {content || "No description available."}
        </Typography>}

        {/* Read Full Article Button */}
        <Button
          variant="contained"
          color="primary"
          href={article.url}
          target="_blank"
          endIcon={<LaunchIcon />}
          sx={{ mt: 2, textTransform: "none", fontSize: "16px", fontWeight: "bold", borderRadius: "8px" }}
        >
          Read Full Article
        </Button>
      </CardContent>
    </Card>
  </Container>
);

};

export default ArticleDetail;
// export default NewsDetails;
