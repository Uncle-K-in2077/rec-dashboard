import { Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logout({ navigate }));
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="row">
      <div className="header-avatar">
        <Avatar onClick={handleClick} />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
