import React from "react";
import moment from "moment";
import { Chart } from "chart.js";
import { withStyles, withTheme } from "@material-ui/styles";
import { lighten, darken } from "@material-ui/core/styles/colorManipulator";
import styles from "./weights-styles";

class Weights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: null
    };
    this.chart = React.createRef();
  }

  componentDidMount() {
    const { weights, theme } = this.props;
    const colors = {
      pointBorderColor: theme.palette.primary.main,
      pointBackgroundColor: theme.palette.primary.main,
      borderColor: lighten(theme.palette.primary.main, 0.1),
      borderWidth: 0.5,
      backgroundColor: "transparent"
    };
    weights.reverse();
    if (weights.length > 1) {
      this.setState({
        chart: new Chart(this.chart.current, {
          type: "line",
          data: {
            labels: weights.map(v => moment(v.datetime).format("hh:mm DD/MM/YY")),

            datasets: [
              {
                label: "weight",
                data: weights.map(v => v.weight),
                pointBorderColor: colors.pointBorderColor,
                pointBackgroundColor: colors.pointBackgroundColor,
                borderColor: colors.borderColor,
                backgroundColor: colors.backgroundColor,
                boderWidth: colors.borderWidth
              }
            ]
          },
          options: {
            layout: {
              padding: {
                right: 4
              }
            },
            devicePixelRatio: 2,
            legend: {
              onClick: e => e.stopPropagation(),
              labels: {
                fontColor: darken(theme.palette.primary.main, 0.1)
              }
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    display: false
                  }
                }
              ],
              yAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    fontColor: darken(theme.palette.primary.main, 0.3)
                  }
                }
              ]
            }
          }
        })
      });
    } else {
      return;
    }
  }

  render() {
    const { classes, chart } = this.props;
    return (
      <div className={`${classes.container}`}>
        <div className={`${classes.chartContainer}`}>
          <canvas className={`${chart ? classes.chart : classes.noChart}`} ref={this.chart}></canvas>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withTheme(Weights));
