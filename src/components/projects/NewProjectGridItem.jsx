import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function NewProjectGridItem() {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <Box marginY={4}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h5" component="h3">
              Create a new project
            </Typography>
            <form>
              <TextField
                fullWidth
                margin="normal"
                label="Project name"
                variant="outlined"
                size="small"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Create Project
              </Button>
            </form>
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
}

export default NewProjectGridItem;
