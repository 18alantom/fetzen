import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./goal-add-modal-styles";
import { Collapse, Typography, ClickAwayListener } from "@material-ui/core";
import { Goal } from "../../../../helpers/classes";
import { LeftButton, RightButton } from "../../CustomButton";
import CustomDialog from "../../CustomDialog";
import CustomTextField from "../../CustomTextField";

class GoalAddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      notEntered: "",
      title: "",
      detail: "",
      deadline: ""
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.addGoalHandler = this.addGoalHandler.bind(this);
  }

  inputChangeHandler({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  addGoalHandler() {
    const { title, detail, deadline } = this.state;

    if (title === "") {
      this.setState({ notEntered: "title", error: true });
    } else if (detail === "") {
      this.setState({ notEntered: "detail", error: true });
    } else if (deadline === "") {
      this.setState({ notEntered: "deadline", error: true });
    } else {
      const goal = new Goal(title, detail, new Date(deadline));
      this.props.handleGoalAdd(goal);
      this.props.handleClose();
    }
  }

  render() {
    const { handleClose, open, classes } = this.props;
    return (
      <CustomDialog
        open={open}
        className={`${classes.paper}`}
        onKeyPress={e => {
          if (e.key === "Enter") {
            this.addGoalHandler();
          }
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div className={`${classes.container}`}>
            <Typography component="h2" className={`${classes.title}`}>
              add goal
            </Typography>
            <div className={`${classes.form}`}>
              <CustomTextField name="title" label="Title" type="text" className={`${classes.input}`} onChange={this.inputChangeHandler} />
              <CustomTextField name="detail" label="Detail" multiline className={`${classes.input}`} onChange={this.inputChangeHandler} />
              <CustomTextField
                name="deadline"
                label="Deadline"
                type="date"
                className={`${classes.input}`}
                InputLabelProps={{ shrink: true }}
                onChange={this.inputChangeHandler}
              />
            </div>
            <Collapse in={this.state.error}>
              <Typography component="p" className={`${classes.error}`}>
                {this.state.notEntered} is required
              </Typography>
            </Collapse>
            <div className={`${classes.buttonContainer}`}>
              <LeftButton className={`${classes.button}`} onClick={this.addGoalHandler}>
                add
              </LeftButton>
              <RightButton className={`${classes.button}`} onClick={handleClose}>
                close
              </RightButton>
            </div>
          </div>
        </ClickAwayListener>
      </CustomDialog>
    );
  }
}

export default withStyles(styles)(GoalAddModal);
