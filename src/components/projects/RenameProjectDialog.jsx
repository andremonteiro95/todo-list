import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { VALIDATION_REGEXS } from '../../constants';

function RenameProjectDialog(props) {
  const { onCancel, open, name } = props;
  console.log(name);
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm();

  useEffect(() => {
    setTimeout(() => {
      setValue('name', name);
    }, 1000);
  }, [name, open]);

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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Rename project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Project name"
            fullWidth
            {...register('name', {
              required: true,
              pattern: VALIDATION_REGEXS.projectName,
            })}
            error={!!errors.name}
            helperText={getHelperText()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Rename
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default RenameProjectDialog;
