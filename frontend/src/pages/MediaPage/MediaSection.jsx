import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

const videoNews = [
  {
    title: "Global Market Trends",
    url: "https://www.youtube.com/embed/5qap5aO4i9A",
  },
  {
    title: "AI Revolution in 2025",
    url: "https://www.youtube.com/embed/mP0RAo9SKZk",
  },
  {
    title: "Breaking News: SpaceX Launch",
    url: "https://www.youtube.com/embed/T74C73Uqv20",
  },
];

const carouselVideos = [
  "https://www.youtube.com/embed/BxTxOvXO_3Q",
  "https://www.youtube.com/embed/3JZ_D3ELwOQ",
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
];

const newsHighlights = [
  "🚀 SpaceX launches a new satellite",
  "📉 Market sees a 10% drop amid global tensions",
  "🤖 AI surpasses human-level coding accuracy",
];

const MediaSection = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: 3 }}>
      {/* Animated News Highlights */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: "#f5f5f5",
          padding: "10px",
          borderRadius: "8px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          🔥 Trending News
        </Typography>
        <ul>
          {newsHighlights.map((news, index) => (
            <motion.li key={index} whileHover={{ scale: 1.1 }}>
              {news}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Video News Section */}
      <Typography variant="h4" sx={{ mb: 2 }}>
        🎥 Video News
      </Typography>
      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        {videoNews.map((video, index) => (
          <Card key={index} sx={{ maxWidth: 345 }}>
            <CardMedia
              component="iframe"
              height="200"
              src={video.url}
              title={video.title}
              allowFullScreen
            />
            <CardContent>
              <Typography variant="h6">{video.title}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Video Carousel */}
      <Typography variant="h4" sx={{ my: 3 }}>
        🎞️ Featured Videos
      </Typography>
      <Slider {...sliderSettings}>
        {carouselVideos.map((video, index) => (
          <Box key={index} sx={{ textAlign: "center" }}>
            <iframe
              width="100%"
              height="400"
              src={video}
              title={`Video ${index + 1}`}
              allowFullScreen
            ></iframe>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default MediaSection;
