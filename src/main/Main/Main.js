import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import WorkoutCard from "../WorkoutCard/WorkoutCard";
import { withStyles } from "@material-ui/styles";
import styles from "./main-styles";

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
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
