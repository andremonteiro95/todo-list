import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import TaskList from './TaskList';

const useStyles = makeStyles(() => ({
  cardActions: {
    alignItems: 'center',
  },
}));

function ProjectGridItem() {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardHeader
          title="Todo List"
          action={
            <>
              <IconButton aria-label="edit" color="primary" size="small">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" color="primary" size="small">
                <DeleteIcon />
              </IconButton>
            </>
          }
        ></CardHeader>
        <CardContent>
          <TaskList />
        </CardContent>
        <CardActions className={classes.cardActions}>
          <TextField fullWidth label="Task" variant="outlined" size="small" />
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ProjectGridItem;
