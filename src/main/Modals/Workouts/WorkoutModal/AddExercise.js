import clone from "clone";
import React from "react";
import { workoutKeys, exerciseKeys } from "../../../../helpers/constants";
import { withStyles } from "@material-ui/styles";
import styles from "./workout-modal-styles";
import CustomDialog from "../../CustomDialog";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { Typography, IconButton, ClickAwayListener, Collapse } from "@material-ui/core";
import { CustomTextField2, CustomTextField3 } from "../../CustomTextField";
import { Days, AreYouSure, Exercise } from "./WorkoutModalComponents";
import { LeftButton, RightButton } from "../../CustomButton";
import { getDay } from "../../../../helpers/helpers";

export const AddExercise = withStyles(styles)(function(props) {

});
