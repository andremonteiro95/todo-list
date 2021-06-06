import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import NewProjectGridItem from './NewProjectGridItem';
import ProjectGridItem from './ProjectGridItem';
import { useDispatch, useSelector } from 'react-redux';
import { getIsProjectsLoading, getProjects } from '../../redux/selectors';
import { loadProjects } from '../../redux/slices/projects';

function ProjectGrid() {
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const isProjectsLoading = useSelector(getIsProjectsLoading);

  useEffect(() => {
    dispatch(loadProjects());
  }, [dispatch]);

  if (projects.length === 0 && isProjectsLoading) {
    return (
      <Box margin={2} display="flex" justifyContent="center">
        <Box marginTop={8}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return (
    <Box margin={2}>
      <Grid container spacing={2}>
        {projects.map(({ id }) => (
          <ProjectGridItem key={id} projectId={id} />
        ))}
        <NewProjectGridItem />
      </Grid>
    </Box>
  );
}

export default ProjectGrid;
