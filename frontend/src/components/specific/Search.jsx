// /**
//  * This file implements a dialog-based search interface using Material-UI components.
//  * It consists of two main components:
//  * 1. Search - The actual search component that displays search results
//  * 2. SimpleDialog - The actual dialog component that displays emails and handles selection
//  * 3. SimpleDialogDemo - The parent component that manages dialog state and display
//  */

// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   List,
//   ListItem,
//   ListItemAvatar,
//   Avatar,
//   ListItemText,
//   IconButton,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// /**
//  * Search Component
//  * @param {Object} props - Component props
//  *
//  * This component displays a dialog with:
//  * - Search input field
//  * - List of search results
//  * Each item is clickable and will display the selected result
//  */
// const Search = ({toggleSearch,handleSearch}) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
// const [toggleDialog, setToggleDialog] = useState(true);
//   // Called when user types in search input
//   const handleSearch1 = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     // TODO: Implement search logic here
//     // This would typically involve an API call to search users
//     setSearchResults([
//       // Dummy data for now
//       { id: 1, name: 'John Doe', avatar: '' },
//       { id: 2, name: 'Jane Smith', avatar: '' },
//     ]);
//   };

//   return (
//     <Dialog open={toggleSearch} onClose={() => {}} maxWidth="sm" fullWidth>
//       <DialogTitle>
//         Search Users
//         <IconButton
//           aria-label="close"
//           onClick={() => {handleSearch()}} // Close dialog when close icon is clicked
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           margin="dense"
//           label="Search users..."
//           type="text"
//           fullWidth
//           variant="outlined"
//           value={searchQuery}
//           onChange={handleSearch1}
//         />
//         <List>
//           {/* Map through search results to create clickable list items */}
//           {searchResults.map((user) => (
//             <ListItem key={user.id} button>
//               <ListItemAvatar>
//                 <Avatar src={user.avatar} alt={user.name}>
//                   {user.name[0]}
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText primary={user.name} />
//             </ListItem>
//           ))}
//         </List>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default Search;
// //sample mui dialog component for understanding

// // import * as React from 'react';
// // import PropTypes from 'prop-types';
// // import Button from '@mui/material/Button';
// // import Avatar from '@mui/material/Avatar';
// // import List from '@mui/material/List';
// // import ListItem from '@mui/material/ListItem';
// // import ListItemAvatar from '@mui/material/ListItemAvatar';
// // import ListItemButton from '@mui/material/ListItemButton';
// // import ListItemText from '@mui/material/ListItemText';
// // import DialogTitle from '@mui/material/DialogTitle';
// // import Dialog from '@mui/material/Dialog';
// // import PersonIcon from '@mui/icons-material/Person';
// // import AddIcon from '@mui/icons-material/Add';
// // import Typography from '@mui/material/Typography';
// // import { blue } from '@mui/material/colors';

// // // Sample email data - replace with actual user data in production
// // const emails = ['username@gmail.com', 'user02@gmail.com'];

// // /**
// //  * SimpleDialog Component
// //  * @param {Object} props - Component props
// //  * @param {Function} props.onClose - Function to call when dialog should close
// //  * @param {string} props.selectedValue - Currently selected email/value
// //  * @param {boolean} props.open - Whether dialog is visible
// //  *
// //  * This component displays a dialog with:
// //  * - List of email addresses that can be selected
// //  * - An "Add account" option at the bottom
// //  * Each item is clickable and will close the dialog when selected
// //  */
// // function SimpleDialog(props) {
// //   const { onClose, selectedValue, open } = props;

// //   // Called when user clicks outside dialog or needs to close it
// //   const handleClose = () => {
// //     onClose(selectedValue);
// //   };

// //   // Called when user clicks on an email or "Add account"
// //   // Passes the selected value back to parent via onClose
// //   const handleListItemClick = (value) => {
// //     onClose(value);
// //   };

// //   return (
// //     <Dialog onClose={handleClose} open={open}>
// //       <DialogTitle>Set backup account</DialogTitle>
// //       <List sx={{ pt: 0 }}>
// //         {/* Map through emails to create clickable list items */}
// //         {emails.map((email) => (
// //           <ListItem disablePadding key={email}>
// //             <ListItemButton onClick={() => handleListItemClick(email)}>
// //               <ListItemAvatar>
// //                 <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
// //                   <PersonIcon />
// //                 </Avatar>
// //               </ListItemAvatar>
// //               <ListItemText primary={email} />
// //             </ListItemButton>
// //           </ListItem>
// //         ))}
// //         {/* Add account option at bottom of list */}
// //         <ListItem disablePadding>
// //           <ListItemButton
// //             autoFocus
// //             onClick={() => handleListItemClick('addAccount')}
// //           >
// //             <ListItemAvatar>
// //               <Avatar>
// //                 <AddIcon />
// //               </Avatar>
// //             </ListItemAvatar>
// //             <ListItemText primary="Add account" />
// //           </ListItemButton>
// //         </ListItem>
// //       </List>
// //     </Dialog>
// //   );
// // }

// // // PropTypes for type checking
// // SimpleDialog.propTypes = {
// //   onClose: PropTypes.func.isRequired,
// //   open: PropTypes.bool.isRequired,
// //   selectedValue: PropTypes.string.isRequired,
// // };

// // /**
// //  * SimpleDialogDemo Component
// //  * Parent component that:
// //  * 1. Controls dialog visibility state
// //  * 2. Manages selected value
// //  * 3. Provides button to open dialog
// //  * 4. Displays currently selected value
// //  */
// // export default function SimpleDialogDemo() {
// //   // State for dialog visibility
// //   const [open, setOpen] = React.useState(false);
// //   // State for tracking selected email/value
// //   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

// //   // Opens the dialog when button is clicked
// //   const handleClickOpen = () => {
// //     setOpen(true);
// //   };

// //   // Handles dialog closure and updates selected value
// //   const handleClose = (value) => {
// //     setOpen(false);
// //     setSelectedValue(value);
// //   };

// //   return (
// //     <div>
// //       {/* Display current selection */}
// //       <Typography variant="subtitle1" component="div">
// //         Selected: {selectedValue}
// //       </Typography>
// //       <br />
// //       {/* Button to trigger dialog */}
// //       <Button variant="outlined" onClick={handleClickOpen}>
// //         Open simple dialog
// //       </Button>
// //       {/* Dialog component with necessary props */}
// //       <SimpleDialog
// //         selectedValue={selectedValue}
// //         open={open}
// //         onClose={handleClose}
// //       />
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { Dialog, DialogContent, TextField, IconButton, List, ListItem, ListItemText, ListItemAvatar } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import SearchIcon from "@mui/icons-material/Search";

// const Search = ({ toggleSearch, handleSearch }) => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const API_KEY ='3644ba423c305ebae00e511d697c55e0';

//   const handleInputChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const handleSearchSubmit = async (e) => {
//     e.preventDefault();
//     if (query.trim() === "") return;

//     try {
//       const response = await fetch(`https://gnews.io/api/v4/search?q=${query}&apikey=${API_KEY}`);
//       const data = await response.json();
//       setResults(data.articles || []);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   return (
//     <Dialog open={toggleSearch} onClose={handleSearch} fullWidth maxWidth="sm">
//       <DialogContent>
//         <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <TextField
//             autoFocus
//             fullWidth
//             label="Search news..."
//             variant="outlined"
//             value={query}
//             onChange={handleInputChange}
//           />
//           <IconButton type="submit">
//             <SearchIcon />
//           </IconButton>
//           <IconButton onClick={handleSearch}>
//             <CloseIcon />
//           </IconButton>
//         </form>
//         <List>
//           {results.map((article, index) => (
//             <ListItem key={index} component="a" href={article.url} target="_blank">
//               <ListItemAvatar ></ListItemAvatar>
//               <ListItemText primary={article.title} secondary={article.source.name} />
//             </ListItem>
//           ))}
//         </List>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default Search;

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ toggleSearch, handleSearchToggle }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const API_KEY = "3644ba423c305ebae00e511d697c55e0";

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;

    try {
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=${query}&apikey=${API_KEY}`
      );
      const data = await response.json();
      console.log('data from search query',data)
      console.log('data from search query article',data.articles)
      setResults(data.articles || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
const handleClick = ()=>{
  handleSearchToggle()
}
  return (
    <Dialog open={toggleSearch} onClose={handleSearchToggle} fullWidth maxWidth="sm">
      <DialogContent>
        <form
          onSubmit={handleSearchSubmit}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <TextField
            autoFocus
            fullWidth
            label="Search news..."
            variant="outlined"
            value={query}
            onChange={handleInputChange}
          />
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>
          <IconButton onClick={handleSearchToggle}>
            <CloseIcon />
          </IconButton>
        </form>
        {/* <List>
          {results.map((article, index) => (
            <ListItem key={index} component="a" href={article.url} target="_blank">
              <ListItemAvatar > 
                <Avatar
                  variant="rounded"
                  src={article.image || "https://via.placeholder.com/100"}
                  alt={article.title}
                  sx={{ width: 80, height: 80 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={article.title}
                secondary={article.source?.name || "Unknown Source"}
                sx={{ ml: 2 }} // Adds a gap between image and text

              />
            </ListItem>
          ))}
        </List> */}
        <List>
        {results.map((article, index) => (

          <ListItem
            key={index}
            component={Link}
            to={`/articles/${article.publishedAt}`}
            onClick={()=>handleClick(article)}
            state={{ article }}
          >
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                src={article.image || "https://via.placeholder.com/100"}
                alt={article.title}
                sx={{ width: 80, height: 60 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={article.title}
              secondary={article.source?.name || "Unknown Source"}
              sx={{ ml: 2 }}
            />
                      {/* Separate "Read Original" link */}
          <Box sx={{ textAlign: "right", mt: 1 }}>
            <Typography
              component="a"
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Read Original
            </Typography>
          </Box>
          </ListItem>



))}

        </List>
      </DialogContent>
    </Dialog>
  );
};

export default Search;
