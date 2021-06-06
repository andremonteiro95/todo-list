import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { VALIDATION_REGEXS } from '../../constants';

function RenameProjectDialog(props) {
  const { label, onCancel, onRename, open, title, value } = props;
  const { control, handleSubmit } = useForm();

  const getHelperText = (error) => {
    switch (error?.type) {
      case 'required':
        return 'The project name is required.';
      case 'pattern':
        return 'The project name is invalid.';
      default:
        return null;
    }
  };

  const onSubmit = ({ name }) => {
    onRename(name);
  };

  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {/* Workaround to work inside a dialog */}
          <Controller
            name="name"
            control={control}
            defaultValue={value}
            rules={{
              required: true,
              pattern: VALIDATION_REGEXS.noWhitespaceAtBeginning,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                autoFocus
                required
                margin="dense"
                label={label}
                fullWidth
                error={!!error}
                helperText={getHelperText(error)}
                {...field}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default RenameProjectDialog;
