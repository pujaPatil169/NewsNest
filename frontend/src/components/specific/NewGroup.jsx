import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Checkbox,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const NewGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Dummy users data
  const users = [
    { id: 1, name: 'John Doe', avatar: '' },
    { id: 2, name: 'Jane Smith', avatar: '' },
    { id: 3, name: 'Alice Johnson', avatar: '' },
  ];

  const handleToggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreateGroup = () => {
    // TODO: Implement group creation logic
    console.log('Creating group:', {
      name: groupName,
      members: selectedUsers,
    });
  };

  return (
    <Dialog open={true} onClose={() => {}} maxWidth="sm" fullWidth>
      <DialogTitle>
        Create New Group
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
        <TextField
          autoFocus
          margin="dense"
          label="Group Name"
          type="text"
          fullWidth
          variant="outlined"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Select Members
        </Typography>
        <List>
          {users.map((user) => (
            <ListItem
              key={user.id}
              button
              onClick={() => handleToggleUser(user.id)}
            >
              <Checkbox
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleToggleUser(user.id)}
              />
              <ListItemAvatar>
                <Avatar src={user.avatar} alt={user.name}>
                  {user.name[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {}}>Cancel</Button>
        <Button
          onClick={handleCreateGroup}
          variant="contained"
          disabled={!groupName || selectedUsers.length < 2}
        >
          Create Group
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewGroup;