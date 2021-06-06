import { Button, CardActions, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { VALIDATION_REGEXS } from '../../constants';
import { getIsProjectsLoading } from '../../redux/selectors';
import { addTask } from '../../redux/slices/projects';

const useStyles = makeStyles(() => ({
  cardActions: {
    alignItems: 'stretch',
  },
}));

function AddTaskCardActions(props) {
  const { projectId } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const isProjectsLoading = useSelector(getIsProjectsLoading);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm();

  const getHelperText = () => {
    switch (errors.description?.type) {
      case 'required':
        return 'The task description is required.';
      case 'pattern':
        return 'The task description is invalid.';
      default:
        return null;
    }
  };

  const onSubmit = ({ description }) => {
    dispatch(addTask({ projectId, description }));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardActions className={classes.cardActions}>
        <TextField
          fullWidth
          label="Task"
          variant="outlined"
          size="small"
          {...register('description', {
            required: true,
            pattern: VALIDATION_REGEXS.noWhitespaceAtBeginning,
          })}
          error={!!errors.description}
          helperText={getHelperText()}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isProjectsLoading}
        >
          Add
        </Button>
      </CardActions>
    </form>
  );
}

export default AddTaskCardActions;
