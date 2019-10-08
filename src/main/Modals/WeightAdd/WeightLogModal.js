import React from "react";
import { withStyles } from "@material-ui/styles";
import { ClickAwayListener, InputAdornment, Typography } from "@material-ui/core";
import { CustomTextField1 } from "../CustomTextField";
import { LeftButton, RightButton } from "../CustomButton";
import styles from "./weight-log-modal-styles";
import CustomDialog from "../CustomDialog";

class ProfileModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      change: null,
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.setState({ value: this.props.initValue });
  }

  handleChange(e) {
    this.setState({ value: e.target.value, change: true });
  }

  handleClose() {
    this.setState({ change: false });
    this.props.handleClose();
  }

  handleUpdate() {
    this.props.handleUpdate(this.state.value);
    this.handleClose();
  }

  render() {
    const { open, classes, wUnit } = this.props;
    const { change, value } = this.state;
    return (
      <CustomDialog
        open={open}
        onKeyPress={e => {
          if (e.key === "Enter") {
            this.handleUpdate();
          }
        }}
      >
        <ClickAwayListener onClickAway={this.handleClose}>
          <div className={`${classes.container}`}>
            <div className={`${classes.header}`}>
              <Typography variant="h2" className={`${classes.title}`}>
                Log Weight
              </Typography>
            </div>
            <div className={`${classes.weight}`}>
              <CustomTextField1
                className={`${classes.valueEnter}`}
                value={value}
                name="weight"
                type="number"
                onChange={this.handleChange}
                InputProps={{ endAdornment: <InputAdornment position="end">{wUnit}</InputAdornment> }}
              />
            </div>
            <div className={`${classes.buttonContainer}`}>
              {change && (
                <LeftButton className={`${classes.button}`} onClick={this.handleUpdate} disableRipple>
                  add
                </LeftButton>
              )}
              <RightButton style={{ textAlign: "left" }} className={`${classes.button} ${classes.buttonRight}`} onClick={this.handleClose} disableRipple>
                close
              </RightButton>
            </div>
          </div>
        </ClickAwayListener>
      </CustomDialog>
    );
  }
}

export default withStyles(styles)(ProfileModal);
