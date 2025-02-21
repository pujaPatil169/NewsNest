import { TextField, Button, Box } from '@mui/material';
import { useState } from 'react';

const NoteEditor = ({ onSave, articleId }) => {
  const [note, setNote] = useState('');

  const handleSave = () => {
    onSave({ articleId, note });
    setNote('');
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        label="Take a note"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
        Save Note
      </Button>
    </Box>
  );
};

export default NoteEditor;
