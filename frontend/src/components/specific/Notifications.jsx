import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Notifications = () => {
  // Dummy notifications data
  const notifications = [
    {
      id: 1,
      type: 'message',
      sender: 'John Doe',
      content: 'Sent you a message',
      time: '2 minutes ago',
      avatar: '',
    },
    {
      id: 2,
      type: 'group',
      sender: 'Jane Smith',
      content: 'Added you to group "Project Team"',
      time: '1 hour ago',
      avatar: '',
    },
  ];

  return (
    <Dialog open={true} onClose={() => {}} maxWidth="sm" fullWidth>
      <DialogTitle>
        Notifications
        <IconButton
          aria-label="close"
          onClick={() => {}}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <List>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <ListItem key={notification.id} button>
                <ListItemAvatar>
                  <Avatar src={notification.avatar} alt={notification.sender}>
                    {notification.sender[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={notification.sender}
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        {notification.content}
                      </Typography>
                      <br />
                      <Typography component="span" variant="caption" color="textSecondary">
                        {notification.time}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No new notifications" />
            </ListItem>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default Notifications;