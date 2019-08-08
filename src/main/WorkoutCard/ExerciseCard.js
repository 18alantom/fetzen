import React from "react";
import { Typography, Collapse } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { getAvg, getMax } from "../../helpers/helpers";
import { intensityUnits, setKeys } from "../../helpers/constants";

const styles = theme => {
  return {
    container: {},
    name: {
      maxWidth: "170px",
      whiteSpace: "nowrap",
      overflow: "scroll"
    },
    titleBar: {
      color: theme.palette.primary.main,
      display: "flex",
      justifyContent: "space-between",
      marginTop: "8px"
    },
    detailContainer: {
      color: theme.palette.primary.main,
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateAreas: `"avg rep set"`
      // justifyContent: "space-between"
    },
    detailAvg: {
      justifySelf: "start",
      gridArea: "avg"
    },
    detailRep: {
      justifySelf: "center",
      gridArea: "rep"
    },
    detailSet: {
      justifySelf: "end",
      gridArea: "set"
    },
    divisor: {
      borderColor: fade(theme.palette.primary.light, 0.4),
      marginTop: "12px"
    }
  };
};

class ExerciseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avgAccuracy: 0
    };
  }
  render() {
    const { classes, exercise, collapsed } = this.props;
    const { avgAccuracy } = this.state;
    const { name, sets, units } = exercise;
    return (
      <div className={classes.container}>
        <div className={classes.titleBar}>
          <Typography className={classes.name}>{name}</Typography>
          <Typography>{`Max ${getMax(exercise, setKeys.intensity)} ${intensityUnits[units]}`}</Typography>
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
