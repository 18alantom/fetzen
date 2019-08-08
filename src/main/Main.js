import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import WorkoutCard from "./WorkoutCard/WorkoutCard";
import { withStyles } from "@material-ui/styles";

const styles = theme => {
  return {
    mainContainer: {
      background: theme.palette.secondary.light,
      height: "100%",
      display: "grid",
      gridTemplate: "4rem auto/ 272px auto auto",
      gridTemplateAreas: `
        "navbar navbar navbar"
        "sidebar cards cards"
      `
    },
    cardsContainer: {
      padding: "8px",
      columnCount: "auto",
      columnWidth: "300px",
      columnGap: "8px",
      marginRight: "15%",
      gridArea: "cards",
      background: theme.palette.secondary.light
    }
  };
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      classes,
      data: { goals, workouts }
    } = this.props;
    return (
      <div className={classes.mainContainer}>
        <Navbar />
        <Sidebar workouts={workouts} goals={goals} />
        <div className={classes.cardsContainer}>
          {workouts.map((w, i) => (
            <WorkoutCard workout={w} key={i} />
          ))}
          {/* {[400, 500, 450, 600, 200, 700, 500, 375, 505].map((w, i) => (
            <WorkoutCard workout={w} key={i} />
          ))} */}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
