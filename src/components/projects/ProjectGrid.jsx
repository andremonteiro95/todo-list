import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Box } from '@material-ui/core';
import NewProjectGridItem from './NewProjectGridItem';

function ProjectGrid() {
  return (
    <Box margin={2}>
      <Grid container spacing={2}>
        <NewProjectGridItem />
      </Grid>
    </Box>
  );
}

export default ProjectGrid;
