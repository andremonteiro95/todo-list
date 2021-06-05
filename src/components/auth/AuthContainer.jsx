import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  div: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function AuthContainer(props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <div className={classes.div}>{children}</div>
    </Container>
  );
}

export default AuthContainer;
