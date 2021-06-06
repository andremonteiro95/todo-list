import React from 'react';
import ProjectGrid from './ProjectGrid';
import ProjectsErrorSnackbar from './ProjectsErrorSnackbar';

function ProjectsPage() {
  return (
    <>
      <ProjectGrid />
      <ProjectsErrorSnackbar />
    </>
  );
}

export default ProjectsPage;
