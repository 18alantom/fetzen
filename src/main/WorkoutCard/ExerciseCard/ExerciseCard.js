import React from "react";
import { Typography, Collapse } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { getAvg, getMax } from "../../../helpers/helpers";
import { intensityUnits, setKeys } from "../../../helpers/constants";
import styles from "./exercise-card-styles";

class ExerciseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avgAccuracy: 0
    };
  }
  render() {
    const { classes, exercise, collapsed, handleExerciseClick } = this.props;
    const { avgAccuracy } = this.state;
    const { name, sets, units } = exercise;
    return (
      <div className={classes.container} onClick={handleExerciseClick}>
        <div className={classes.titleBar}>
          <Typography className={classes.name}>{name}</Typography>
          <Typography>{`Max ${getMax(exercise, setKeys.intensity).toFixed(avgAccuracy)} ${intensityUnits[units]}`}</Typography>
        </div>
        <Collapse in={!collapsed}>
          <div className={classes.detailContainer}>
            <Typography className={classes.detailAvg}>{`Avg ${getAvg(exercise, setKeys.intensity).toFixed(avgAccuracy)} ${intensityUnits[units]}`}</Typography>
            <Typography className={classes.detailSet}>{`Sets ${sets.length}`}</Typography>
            <Typography className={classes.detailRep}>{`Reps ${getAvg(exercise, setKeys.reps).toFixed(avgAccuracy)}`}</Typography>
          </div>
          <hr className={classes.divisor} />
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles)(ExerciseCard);
