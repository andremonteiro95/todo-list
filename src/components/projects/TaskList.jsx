import React from 'react';
import List from '@material-ui/core/List';
import { useSelector } from 'react-redux';
import { getTasksByProjectId } from '../../redux/selectors';
import TaskListItem from './TaskListItem';

function TaskList(props) {
  const { projectId } = props;
  const tasks = useSelector(getTasksByProjectId(projectId));

  const getList = (tasksDone) => {
    const filteredTasks = tasks.filter(({ done }) => !!done === tasksDone);

    if (filteredTasks.length === 0) {
      return null;
    }

    return (
      <List subheader={tasksDone ? 'Done' : 'To do'}>
        {filteredTasks.map((task) => (
          <TaskListItem key={task.id} projectId={projectId} task={task} />
        ))}
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
