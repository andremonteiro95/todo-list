import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIsProjectsLoading,
  getTasksByProjectId,
} from '../../redux/selectors';
import { deleteTask, toggleTaskStatus } from '../../redux/slices/projects';

function TaskList(props) {
  const { projectId } = props;
  const dispatch = useDispatch();
  const isProjectsLoading = useSelector(getIsProjectsLoading);
  const tasks = useSelector(getTasksByProjectId(projectId));

  const onDelete = (taskId) => () => {
    dispatch(deleteTask({ projectId, taskId }));
  };

  const onToggle = (taskId) => () => {
    if (isProjectsLoading) {
      return;
    }
    dispatch(toggleTaskStatus({ projectId, taskId }));
  };

  return (
    <List>
      {tasks.map(({ done, id, task }) => {
        return (
          <ListItem key={id} dense button onClick={onToggle(id)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={done}
                disableRipple
                color="primary"
              />
            </ListItemIcon>
            <ListItemText primary={task} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={onDelete(id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

export default TaskList;
