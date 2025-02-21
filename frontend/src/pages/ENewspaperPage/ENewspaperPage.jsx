import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRSSFeeds } from "../../store/newsSlice";
import {
  Box,
  TextField,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import Loader from "../../components/Loader/Loader";

const ENewspaperPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rssFeeds, status,result } = useSelector((state) => state.news);
  const [searchQuery, setSearchQuery] = useState("");
console.log('result from fetching rss feeds',result)
  const images = [
    {
      name: "Times of India",
      url: "https://play-lh.googleusercontent.com/qS2Frwd1Q1Gvtmg-uIbe3ZbzGRojlZOLGrVXNM9mRE_atQXnnzGCNF09OaJoI0tBmg",
    },
    {
      name: "The Hindu",
      url: "https://img-cdn.thepublive.com/filters:format(webp)/bmi/media/post_banners/2e555a57fa18a989c9346fdae552dafbd7a80b4dc61f92ff493d8ae9f5531970.jpg",
    },
    // {
    //   name: "Indian Express",
    //   url: 'https://marketing.readwhere.com/newindian-logo.png',
    // },
    // {
    //   name: "Hindustan Times",
    //   url: 'https://logowik.com/content/uploads/images/hindustan-times9271.jpg',
    // },
    {
      name: "Economic Times",
      url: 'https://img.etimg.com/photo/msid-105722075/et-logo.jpg',
    },
  ];
  useEffect(() => {
    dispatch(fetchRSSFeeds());
  }, []);

  if (status === "loading") {
    return <Loader />;
  }

  const filteredFeeds = rssFeeds ? rssFeeds.filter((feed) =>
    feed.source.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  console.log("fileteredFeeds in enewspaperPage", filteredFeeds);
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        E-Newspapers
      </Typography>

      <TextField
        fullWidth
        label="Search Newspapers"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
      />

      {status === 'failed' && (
        <Typography color="error" sx={{ mb: 2 }}>
          Error loading newspapers. Please try again later.
        </Typography>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
          padding: 2,
        }}
      >
        {filteredFeeds.map((feed, index) => (
          <Card
            key={index}
            sx={{
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.02)",
                transition: "transform 0.3s ease-in-out",
              },
            }}
            onClick={() =>
              navigate(
                `/newspaper/${feed.source.toLowerCase().replace(/\s+/g, "-")}`,
                { state: { feed } }
              )
            }
            // onClick={() => {
            //   navigate(
            //     `/newspaper/${feed.source.toLowerCase().replace(/\s+/g, "-")}`,
            //     { state: {feed} }// Ensure object stability
            //   )
            // }}
          >
            <CardMedia
              component="img"
              sx={{ 
                width: '100%',
                objectFit: 'contain',
                backgroundColor: '#f5f5f5',
                p: 1
              }}
              image={images.find(img => img.name === feed.source)?.url || `/images/newspapers/${feed.source
                .toLowerCase()
                .replace(/\s+/g, "-")}.jpg`}
              alt={feed.source}
            />
            <CardContent sx={{ 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              // height: 'calc(100% - 240px)',
              p: 2
            }}>
              <Typography gutterBottom variant="h5" component="div" sx={{ mb: 2 }}>
                {feed.source}
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{ alignSelf: 'flex-start' }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    `/newspaper/${feed.source
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`,
                    { state: { feed } }
                  );
                }}
              >
                View Articles
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ENewspaperPage;
