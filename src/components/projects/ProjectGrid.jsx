import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import NewProjectGridItem from './NewProjectGridItem';
import ProjectGridItem from './ProjectGridItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../redux/selectors';
import { loadProjects } from '../../redux/slices/projects';

function ProjectGrid() {
  const projects = useSelector(getProjects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProjects());
  }, [dispatch]);

  return (
    <Box margin={2}>
      <Grid container spacing={2}>
        {projects.map(({ id }) => (
          <ProjectGridItem projectId={id} />
        ))}
        <NewProjectGridItem />
      </Grid>
    </Box>
  );
}

export default ProjectGrid;
