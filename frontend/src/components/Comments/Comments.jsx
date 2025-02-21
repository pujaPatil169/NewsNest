import { Box, TextField, Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../utils/socket'; // Assuming socket is initialized in a utils file

const Comments = ({ articleId }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments[articleId] || []); // Fetch comments for the article

  useEffect(() => {
    socket.on('newComment', ({ articleId, comment }) => {
      // Logic to update comments in the Redux store
      dispatch({ type: 'ADD_COMMENT', payload: { articleId, comment } });
    });

    return () => {
      socket.off('newComment'); // Clean up the listener on unmount
    };
  }, [dispatch, articleId]);

  const handleCommentSubmit = () => {
    socket.emit('commentOnArticle', { articleId, comment });
    setComment('');
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Comments</Typography>
      <TextField
        label="Add a comment"
        variant="outlined"
        fullWidth
        multiline
        rows={2}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleCommentSubmit} sx={{ mt: 2 }}>
        Submit Comment
      </Button>
      <Box>
        {comments.map((c, index) => (
          <Typography key={index} variant="body2">{c}</Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Comments;
