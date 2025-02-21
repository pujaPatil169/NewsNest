import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const navLinks = ["politics", "world", "business", "technology","science", "entertainment", "sports", "general", "health"];

  const navLinkClass = ({ isActive }) =>
    `relative text-lg font-medium tracking-wide px-4 py-2 transition-all duration-300
         ${
           isActive
             ? "text-orange-600 border-b-2 border-orange-600"
             : "text-black-300 hover:text-grey"
         }`;

  const DrawerList = (
    <Box
      sx={{ width: 250,height:'vh' }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      {/* how can i write category at the top with good styling    */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center ", padding: "1rem" }}>
        <h1 className="text-2xl font-bold text-orange-600">News Category</h1>

      </Box>
           <Divider />

      <List>
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}

        {navLinks.map((category, i) => (
          <ListItem key={i} disablePadding>
            <NavLink
              key={category}
              to={`/news/${category}`}
              className={navLinkClass}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </NavLink>
          </ListItem>
        ))}
      </List>
      {/* <Divider />
      <List>
        {["science", "entertainment", "sports", "general", "health"].map(
          (category, i) => (
            <ListItem key={i} disablePadding>
              <NavLink
                key={category}
                to={`/news/${category}`}
                // className={navLinkClass}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </NavLink>
            </ListItem>
          )
        )}
      </List> */}
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        {/* <IconButton> */}
          <MenuIcon />
        {/* </IconButton> */}
      </Button>
      <Drawer sx={{backgroundColor:'black'}} open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
