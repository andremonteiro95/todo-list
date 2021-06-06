import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  withStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsProjectsLoading } from '../../redux/selectors';
import { deleteTask, toggleTaskStatus } from '../../redux/slices/projects';
import { formatDate } from '../../utils/date';
import RenameProjectOrTaskDialog from './RenameProjectDialog';

const DateTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: 11,
  },
}))(Tooltip);

function TaskListItem(props) {
  const { projectId, task } = props;
  const { created, description, done, id } = task;
  const [isRenaming, setIsRenaming] = useState(false);

  const dispatch = useDispatch();
  const isProjectsLoading = useSelector(getIsProjectsLoading);

  const onDelete = (taskId) => () => {
    dispatch(deleteTask({ projectId, taskId }));
  };

  const onToggle = (taskId) => () => {
    if (isProjectsLoading) {
      return;
    }
    dispatch(toggleTaskStatus({ projectId, taskId }));
  };

  const getTooltipTitle = ({ created, done }) =>
    done
      ? `Finished at ${formatDate(done)}`
      : `Created at ${formatDate(created)}`;

  return (
    <>
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
            <IconButton
              size="small"
              onClick={() => {
                setIsRenaming(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton edge="end" size="small" onClick={onDelete(id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
      {!done && (
        <RenameProjectOrTaskDialog
          title="Change task description"
          label="Task description"
          value={description}
          open={isRenaming}
          onCancel={() => {
            setIsRenaming(false);
          }}
          onRename={(name) => {
            // dispatch(renameProject({ name, projectId: project.id }));
            setIsRenaming(false);
          }}
        />
      )}
    </>
  );
}

export default TaskListItem;
