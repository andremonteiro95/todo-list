import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsError } from '../../redux/selectors';
import { clearProjectsError } from '../../redux/slices/projects';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ProjectsErrorSnackbar() {
  const dispatch = useDispatch();
  const error = useSelector(getProjectsError);

  if (!error) {
    return null;
  }

  const onClose = () => {
    dispatch(clearProjectsError());
  };

  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={onClose}>
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );
}

export default ProjectsErrorSnackbar;
