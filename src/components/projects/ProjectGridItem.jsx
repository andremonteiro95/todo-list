import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsProjectsLoading, getProjectById } from '../../redux/selectors';
import { deleteProject } from '../../redux/slices/projects';
import AddTaskCardActions from './AddTaskCardActions';
import TaskList from './TaskList';

function ProjectGridItem(props) {
  const { projectId } = props;

  const dispatch = useDispatch();
  const project = useSelector(getProjectById(projectId));
  const isProjectsLoading = useSelector(getIsProjectsLoading);

  const onDeleteClick = () => {
    dispatch(deleteProject(project.id));
  };

  // const [editingName, setEditingName] = useState(false);

  return (
    <>
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
                  // onClick={() => {
                  //   setEditingName(true);
                  // }}
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
          <AddTaskCardActions projectId={project.id} />
        </Card>
      </Grid>
      {/* <RenameProjectDialog
        name={project.name}
        open={editingName}
        onCancel={() => {
          setEditingName(false);
        }}
        onRename={(name) => {
          console.log(name);
          setEditingName(false);
        }}
      /> */}
    </>
  );
}

export default ProjectGridItem;
