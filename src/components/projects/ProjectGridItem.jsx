import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsProjectsLoading, getProjectById } from '../../redux/selectors';
import { renameProject, deleteProject } from '../../redux/slices/projects';
import AddTaskCardActions from './AddTaskCardActions';
import RenameProjectOrTaskDialog from './RenameProjectDialog';
import TaskList from './TaskList';

function ProjectGridItem(props) {
  const { projectId } = props;

  const dispatch = useDispatch();
  const project = useSelector(getProjectById(projectId));
  const isProjectsLoading = useSelector(getIsProjectsLoading);

  const [isRenaming, setIsRenaming] = useState(false);

  // Close dialog only after receiving a response for the request
  useEffect(() => {
    if (isRenaming && !isProjectsLoading) {
      setIsRenaming(false);
    }
  }, [isProjectsLoading]);

  const onDeleteClick = () => {
    dispatch(deleteProject(project.id));
  };

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
                  onClick={() => {
                    setIsRenaming(true);
                  }}
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
      <RenameProjectOrTaskDialog
        title="Rename project"
        label="Project name"
        value={project.name}
        open={isRenaming}
        onCancel={() => {
          setIsRenaming(false);
        }}
        onRename={(name) => {
          dispatch(renameProject({ name, projectId: project.id }));
        }}
      />
    </>
  );
}

export default ProjectGridItem;
