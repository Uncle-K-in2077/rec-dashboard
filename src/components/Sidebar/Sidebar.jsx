import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

export default function Sidebar() {
  const location = useLocation();
  const isActive = (url) => {
    if (location.pathname.toString().startsWith(url)) {
      return "sidebar-active";
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          <Link to={"/dashboard/users"}>
            <ListItem disablePadding>
              <ListItemButton className={isActive("/dashboard/users")}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={"/dashboard/roles"}>
            <ListItem disablePadding>
              <ListItemButton className={isActive("/dashboard/roles")}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Roles" />
              </ListItemButton>
            </ListItem>
          </Link>
          {/* Khai - 06-10 */}
          <Link to={"/dashboard/feedbacks"}>
            <ListItem disablePadding>
              <ListItemButton className={isActive("/dashboard/feedbacks")}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Feed Back" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={"/dashboard/real_estates"}>
            <ListItem disablePadding>
              <ListItemButton className={isActive("/dashboard/real_estates")}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Real_Estates" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={"/dashboard/lands"}>
            <ListItem disablePadding>
              <ListItemButton className={isActive("/dashboard/lands")}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Lands" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </nav>
    </Box>
  );
}
