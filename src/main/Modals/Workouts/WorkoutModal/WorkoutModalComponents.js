import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./workout-modal-styles";
import { Remove } from "@material-ui/icons";
import { Typography, FormControl, FormControlLabel, IconButton, Collapse } from "@material-ui/core";
import { CustomCheckbox } from "../../CustomCheckbox";
import { LeftButton, RightButton } from "../../CustomButton";
import { getDay } from "../../../../helpers/helpers";

export const Days = withStyles(styles)(function(props) {
  const { classes, daysString, open, days, handleDayChange } = props;
  return (
    <div className={`${classes.daysContainer}`}>
      <Typography component="p" className={`${classes.days}`}>
        {daysString}
      </Typography>
      <Collapse in={open}>
        <FormControl className={`${classes.checkboxContainer}`}>
          {[...Array(7).keys()].map(i => {
            let checked = false;
            if (days.find(d => d === i) + 1) {
              checked = true;
            }
            return (
              <FormControlLabel
                className={classes.checkboxLabel}
                label={getDay(i)}
                key={i}
                control={
                  <CustomCheckbox
                    onChange={handleDayChange}
                    checked={checked}
                    value={i}
                    color="primary"
                    inputProps={{
                      "aria-label": "primary checkbox"
                    }}
                  />
                }
              />
            );
          })}
        </FormControl>
        <hr className={classes.divisor} />
      </Collapse>
    </div>
  );
});

export const AreYouSure = withStyles(styles)(function(props) {
  const { name, classes, open, handleDeleteChoice } = props;
  return (
    <Collapse in={open}>
      <Typography component="h2" className={`${classes.subTitle}`}>
        Delete Workout
      </Typography>
      <Typography component="p" className={`${classes.areYouSure}`}>
        {`Are you sure you want to delete the workout '${name}', this action can't be undone.`}
      </Typography>
      <div className={`${classes.buttonContainer}`}>
        <LeftButton
          className={`${classes.button}`}
          onClick={() => {
            handleDeleteChoice(false);
          }}
          disableRipple
        >
          cancel
        </LeftButton>
        <RightButton
          className={`${classes.button}`}
          onClick={() => {
            handleDeleteChoice(true);
          }}
          disableRipple
        >
          delete
        </RightButton>
      </div>
    </Collapse>
  );
});

export const Exercise = withStyles(styles)(function(props) {
  const { classes, index, id, name, onRemoveExerciseClick, collapsed } = props;
  return (
    <div className={`${classes.exercise} ${classes[`col${(index - 1) % 2}`]}`} component="li">
      <Typography component="p" className={`${classes.index}`}>
        {index}.
      </Typography>
      <Typography component="p" className={`${classes.exerciseName}`}>
        {name}
      </Typography>
      {collapsed && (
        <IconButton
          disableRipple
          size="small"
          className={`${classes.button} ${classes.addRemoveButton}`}
          onClick={() => {
            onRemoveExerciseClick(id);
          }}
        >
          <Remove />
        </IconButton>
      )}
    </div>
  );
});
