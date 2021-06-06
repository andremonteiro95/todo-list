import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIsProjectsLoading,
  getTasksByProjectId,
} from '../../redux/selectors';
import { deleteTask, toggleTaskStatus } from '../../redux/slices/projects';
import { Tooltip, withStyles } from '@material-ui/core';
import { formatDate } from '../../utils/date';

const DateTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: 11,
  },
}))(Tooltip);

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

  const getList = (tasksDone) => {
    const filteredTasks = tasks.filter(({ done }) => !!done === tasksDone);

    if (filteredTasks.length === 0) {
      return null;
    }

    const getTooltipTitle = ({ created, done }) =>
      done
        ? `Finished at ${formatDate(done)}`
        : `Created at ${formatDate(created)}`;

    return (
      <List subheader={tasksDone ? 'Done' : 'To do'}>
        {filteredTasks.map(({ created, description, done, id }) => {
          return (
            <ListItem key={id} dense button onClick={onToggle(id)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={!!done}
                  disableRipple
                  color="primary"
                />
              </ListItemIcon>
              <DateTooltip title={getTooltipTitle({ created, done })}>
                <ListItemText primary={description} />
              </DateTooltip>
              {!done && (
                <ListItemSecondaryAction>
                  <IconButton onClick={onDelete(id)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={onDelete(id)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <>
      {getList(false)}
      {getList(true)}
    </>
  );
}

export default TaskList;
