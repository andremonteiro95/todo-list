import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../redux/selectors';
import { logout } from '../../redux/slices/auth';
import { clearProjects } from '../../redux/slices/projects';

function NavbarButton() {
  const [anchorElem, setAnchorEl] = React.useState();
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();

  if (!currentUser) {
    return (
      <Button component={Link} to="/login" color="inherit">
        Sign in
      </Button>
    );
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
    dispatch(clearProjects());
  };

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
        ref={anchorElem}
        endIcon={<ExpandMoreIcon />}
      >
        {currentUser.name}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorElem}
        keepMounted
        open={!!anchorElem}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Sign out</MenuItem>
      </Menu>
    </>
  );
}

export default NavbarButton;
