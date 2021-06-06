import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { VALIDATION_REGEXS } from '../../constants';
import { getIsProjectsLoading } from '../../redux/selectors';
import { createProject } from '../../redux/slices/projects';

const useStyles = makeStyles(() => ({
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function NewProjectGridItem() {
  const classes = useStyles();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const isProjectsLoading = useSelector(getIsProjectsLoading);

  const [isCreating, setIsCreating] = useState();

  // This effect is for showing a progress circle only when creating a project
  useEffect(() => {
    if (isCreating && !isProjectsLoading) {
      setIsCreating(false);
    }
  }, [isProjectsLoading]);

  const onSubmit = (data) => {
    setIsCreating(true);
    dispatch(createProject(data));
    reset();
  };

  const getHelperText = () => {
    switch (errors.name?.type) {
      case 'required':
        return 'The project name is required.';
      case 'pattern':
        return 'The project name is invalid.';
      default:
        return null;
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <Box marginY={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" component="h3">
                Create a new project
              </Typography>
              <TextField
                fullWidth
                required
                margin="normal"
                label="Project name"
                variant="outlined"
                color="secondary"
                size="small"
                {...register('name', {
                  required: true,
                  pattern: VALIDATION_REGEXS.noWhitespaceAtBeginning,
                })}
                error={!!errors.name}
                helperText={getHelperText()}
              />
              <Button
                type="submit"
                disabled={isCreating}
                fullWidth
                variant="contained"
                color="secondary"
              >
                {!isCreating && 'Create Project'}
                {isCreating && <CircularProgress color="inherit" size={24} />}
              </Button>
            </CardContent>
          </form>
        </Box>
      </Card>
    </Grid>
  );
}

export default NewProjectGridItem;
