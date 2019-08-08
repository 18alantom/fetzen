import React from "react";
import { withStyles } from "@material-ui/styles";
import { Drawer, Divider } from "@material-ui/core";
import { WorkoutsList, GoalsList } from "./SidebarList";

const styles = theme => {
  return {
    paper: {
      width: "272px",
      backgroundColor: theme.palette.secondary.light,
      gridArea: "sidebar"
    },
    allListContainer: {
      marginTop: "72px"
    }
  };
};

class Sidebar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const { classes, workouts, goals } = this.props;
    return (
      <Drawer classes={{ paper: classes.paper }} variant="permanent">
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
