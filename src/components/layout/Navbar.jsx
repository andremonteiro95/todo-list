import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import NavbarButton from './NavbarButton';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          TODO List
        </Typography>
        <NavbarButton />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
