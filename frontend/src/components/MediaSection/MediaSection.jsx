import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMediaContent } from '../../store/newsSlice';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './MediaSection.css';
import SkeletonLoader from '../Loader/SkeletonLoader';

const MediaSection = () => {
  const dispatch = useDispatch();
  const { videos, highlights, status, error } = useSelector(state => state.news.mediaContent);

  useEffect(() => {
    dispatch(fetchMediaContent());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="media-section">
        <SkeletonLoader type="media" />
      </div>
    );
  }

  if (status === 'failed') {
    return <div className="media-error">Error: {error}</div>;
  }

  return (
    <div className="media-section">
      <h2 className="media-title">Today&apos;s Media Highlights</h2>
      
      <div className="media-content">
        <div className="video-section">
          <h3>Top News Videos</h3>
          <Carousel showThumbs={false} showStatus={false}>
            {videos.map((video, index) => (
              <div key={index} className="video-item">
                <iframe
                  width="100%"
                  height="315"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="highlights-section">
          <h3>News Highlights</h3>
          <ul className="highlights-list">
            {highlights.map((highlight, index) => (
              <li key={index} className="highlight-item">
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MediaSection;
