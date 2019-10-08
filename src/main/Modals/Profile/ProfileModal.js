import React from "react";
import Weights from "./Weights/Weights";
import { withStyles } from "@material-ui/styles";
import { ClickAwayListener, Typography, Collapse } from "@material-ui/core";
import { LeftButton, RightButton } from "../CustomButton";
import { endpoints } from "../../../helpers/endpoints";
import styles from "./profile-modal-styles";
import CustomDialog from "../CustomDialog";

class ProfileModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weights: null,
      showWeights: false
    };
    this.toggleShowWeights = this.toggleShowWeights.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { sendData, id } = this.props;
    const body = JSON.stringify({ u_id: id });
    sendData(endpoints.users.weightObtainAll, "", body, "POST", weights => {
      this.setState(() => {
        console.log(weights);
        if (!weights.reverse) {
          return { weights: null };
        } else {
          return { weights };
        }
      });
    });
  }

  toggleShowWeights() {
    this.setState(({ showWeights }) => ({ showWeights: !showWeights }));
  }

  handleClose() {
    this.setState({ showWeights: false });
    this.props.handleClose();
  }

  render() {
    const { open, classes, fname, lname, weight, height, wUnit, hUnit } = this.props;
    const { weights, showWeights } = this.state;
    let shouldOpen;
    if (weights && weights.length > 1) {
      shouldOpen = true;
    } else {
      shouldOpen = false;
    }
    return (
      <CustomDialog
        open={open}
        onKeyPress={e => {
          // if (e.key === "Enter") {
          //   this.updateAndClose();
          // }
        }}
      >
        <ClickAwayListener onClickAway={this.handleClose}>
          <div className={`${classes.container}`}>
            <div className={`${classes.header}`}>
              <Typography variant="h2" className={`${classes.flName}`}>
                {`${fname} ${lname}`}
              </Typography>
            </div>
            <div className={`${classes.whContainer}`}>
              <div className={`${classes.nameValueContainer}`}>
                <Typography component="p" className={`${classes.name}`}>
                  Weight
                </Typography>
                <Typography component="p" className={`${classes.value}`}>{`${weight.toFixed(2)} ${wUnit}`}</Typography>
              </div>
              <div className={`${classes.nameValueContainer}`}>
                <Typography component="p" className={`${classes.name}`}>
                  Height
                </Typography>
                <Typography component="p" className={`${classes.value}`}>{`${height.toFixed(2)} ${hUnit}`}</Typography>
              </div>
            </div>
            {shouldOpen && (
              <Collapse in={showWeights}>
                <Weights weights={weights} />
              </Collapse>
            )}

            <div className={`${classes.buttonContainer}`}>
              {!showWeights && weights
                ? shouldOpen && (
                    <LeftButton className={`${classes.button}`} onClick={this.toggleShowWeights} disableRipple>
                      more
                    </LeftButton>
                  )
                : shouldOpen && (
                    <LeftButton className={`${classes.button}`} onClick={this.toggleShowWeights} disableRipple>
                      less
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
