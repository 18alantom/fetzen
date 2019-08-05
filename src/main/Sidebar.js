import React from "react";
import { withStyles } from "@material-ui/styles";
import { Drawer, Typography, IconButton, Divider, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import { LabelOutlined, Add } from "@material-ui/icons";

const styles = theme => {
  console.log(theme);
  return {
    paper: {
      width: "272px",
      backgroundColor: theme.palette.secondary.light, 
    },
    listTitleText: {
      padding: 0,
      margin: "12px 16px 8px",
      fontSize: "0.8em",
      textTransform: "uppercase",
      color: theme.palette.primary.main
    },
    list: {
      color: theme.palette.primary.light,
      padding: 0
    },
    listItemIcon: {
      color: theme.palette.primary.light
    },
    listItem: {
      padding: "4px 16px"
    },
    addButtonContainer: {
      width: "100%"
    },
    addButton: {
      display: "block",
      margin: "8px auto",
      color: theme.palette.primary.main
    },
    allListContainer: {
      marginTop: "72px"
    }
  };
};
const WorkoutsList = withStyles(styles)(
  class extends React.Component {
    render() {
      const { classes, workouts } = this.props;
      return (
        <div>
          <Typography className={classes.listTitleText} component="h3">
            Workouts
          </Typography>
          <List className={classes.list}>
            {workouts.map(({ name }, i) => {
              return (
                <ListItem button key={i} className={classes.listItem}>
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
);

const GoalsList = withStyles(styles)(
  class extends React.Component {
    render() {
      const { classes, goals } = this.props;
      return (
        <div>
          <Typography className={classes.listTitleText} component="h3">
            Goals
          </Typography>
          <List className={classes.list}>
            {goals.map(({ title }, i) => {
              return (
                <ListItem button key={i} className={classes.listItem}>
                  <ListItemIcon className={classes.listItemIcon}>
                    <LabelOutlined />
                  </ListItemIcon>
                  <ListItemText primary={title} className={classes.listItemText} />
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
);

class Sidebar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const { classes, workouts, goals } = this.props;
    console.log(this.props);
    return (
      <Drawer classes={{ paper: classes.paper }}  variant="permanent">
        <div className={classes.allListContainer}>
          <WorkoutsList workouts={workouts} />
          <Divider />
          <GoalsList goals={goals} />
        </div>
      </Drawer>
    );
  }
}
export default withStyles(styles)(Sidebar);
