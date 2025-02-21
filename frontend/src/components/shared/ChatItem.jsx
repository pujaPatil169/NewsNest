import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ChatItem = ({ username, message, timestamp }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ChatItem;
