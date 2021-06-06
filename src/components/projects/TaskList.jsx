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
import { getTasksByProjectId } from '../../redux/selectors';
import { deleteTask } from '../../redux/slices/projects';

function TaskList(props) {
  const { projectId } = props;
  const dispatch = useDispatch();
  const tasks = useSelector(getTasksByProjectId(projectId));

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const onDelete = (taskId) => () => {
    dispatch(deleteTask({ projectId, taskId }));
  };

  return (
    <List>
      {tasks.map(({ id, task }) => {
        return (
          <ListItem
            key={id}
            dense
            button
            //  onClick={handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                // checked={checked.indexOf(value) !== -1}
                disableRipple
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
