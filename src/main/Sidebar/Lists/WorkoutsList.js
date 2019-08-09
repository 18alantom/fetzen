import React from "react";
import { withStyles } from "@material-ui/styles";
import { Typography, IconButton, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import { LabelOutlined, Add } from "@material-ui/icons";
import styles from "./list-styles";

class WorkoutList extends React.Component {
  render() {
    const { classes, workouts, handleWorkoutModalOpen } = this.props;
    return (
      <div>
        <Typography className={classes.listTitleText} component="h3">
          Workouts
        </Typography>
        <List className={classes.list}>
          {workouts.map(({ name }, i) => {
            return (
              <ListItem
                button
                key={i}
                className={classes.listItem}
                onClick={() => {
                  handleWorkoutModalOpen(i);
                }}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <LabelOutlined />
                </ListItemIcon>
                <ListItemText primary={name} className={classes.listItemText} />
              </ListItem>
            );
          })}
        </List>
        <div className={classes.addButtonContainer}>
          <IconButton className={classes.addButton} iaria-label="add-workout">
            <Add />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(WorkoutList);
