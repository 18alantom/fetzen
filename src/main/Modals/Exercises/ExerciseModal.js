import React from "react";
import { exerciseKeys, setKeys } from "../../../helpers/constants";
import { withStyles } from "@material-ui/styles";
import { Typography, Button } from "@material-ui/core";
import styles from "./exercise-modal-styles";
import CustomDialog from "../CustomDialog";

const Set = withStyles(styles)(props => {
  const { index, set, classes, units } = props;
  return (
    <div className={`${classes.setContainer}`}>
      <Typography className={`${classes.index}`}>{index}.</Typography>
      <Typography className={`${classes.detail}`}>
        {set[setKeys.intensity].toFixed(1)} {units}
      </Typography>
      <Typography className={`${classes.detail}`}>{set[setKeys.reps]} reps</Typography>
      <Typography className={`${classes.rest} ${classes.detail}`}>{set[setKeys.rest]} s</Typography>
    </div>
  );
});

class ExerciseModal extends React.Component {
  render() {
    const { open, classes, exercise, handleClose } = this.props;
    return (
      <CustomDialog
        open={open}
        onKeyPress={e => {
          if (e.key === "Enter") {
            handleClose();
          }
        }}
      >
        <div className={`${classes.container}`}>
          <div className={`${classes.header}`}>
            <Typography component="h2" className={`${classes.title}`}>
              {exercise[exerciseKeys.name]}
            </Typography>
            <Typography component="h3" className={`${classes.setsCount}`}>
              {exercise[exerciseKeys.sets].length} sets
            </Typography>
          </div>
          <div className={`${classes.setsContainer}`}>
            {exercise[exerciseKeys.sets].map((set, i) => (
              <Set key={i} index={i + 1} set={set} units={exercise[exerciseKeys.units]} />
            ))}
          </div>
          <div className={`${classes.buttonContainer}`}>
            <Button className={`${classes.button}`} onClick={handleClose}>
              close
            </Button>
          </div>
        </div>
      </CustomDialog>
    );
  }
}

export default withStyles(styles)(ExerciseModal);
