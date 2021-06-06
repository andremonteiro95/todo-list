import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  makeStyles,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsProjectsLoading, getProjectById } from '../../redux/selectors';
import { deleteProject } from '../../redux/slices/projects';
import TaskList from './TaskList';

const useStyles = makeStyles(() => ({
  cardActions: {
    alignItems: 'center',
  },
}));

function ProjectGridItem(props) {
  const { projectId } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const project = useSelector(getProjectById(projectId));
  const isProjectsLoading = useSelector(getIsProjectsLoading);

  const onDeleteClick = () => {
    dispatch(deleteProject(project.id));
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardHeader
          title={project.name}
          action={
            <>
              <IconButton
                color="primary"
                size="small"
                disabled={isProjectsLoading}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="primary"
                size="small"
                disabled={isProjectsLoading}
                onClick={onDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
            </>
          }
        />
        <CardContent>
          <TaskList projectId={project.id} />
        </CardContent>
        <CardActions className={classes.cardActions}>
          <TextField fullWidth label="Task" variant="outlined" size="small" />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isProjectsLoading}
          >
            Add
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ProjectGridItem;
