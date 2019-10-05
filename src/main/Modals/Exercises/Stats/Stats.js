import React from "react";
import moment from "moment";
import { Chart } from "chart.js";
import { withStyles, withTheme } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import { lighten, darken } from "@material-ui/core/styles/colorManipulator";
import styles from "./stats-styles";

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: null
    };
    this.chart = React.createRef();
  }

  componentDidMount() {
    const { stats, theme } = this.props;
    const { maxValues } = stats;
    const colors = {
      pointBorderColor: theme.palette.primary.main,
      pointBackgroundColor: theme.palette.primary.main,
      borderColor: lighten(theme.palette.primary.main, 0.1),
      borderWidth: 0.5,
      backgroundColor: "transparent"
    };
    maxValues.reverse();
    if (maxValues.length > 1) {
      this.setState({
        chart: new Chart(this.chart.current, {
          type: "line",
          data: {
            labels: maxValues.map(v => moment(v.date).format("L")),

            datasets: [
              {
                label: "intensity",
                data: maxValues.map(v => v.intensity),
                pointBorderColor: colors.pointBorderColor,
                pointBackgroundColor: colors.pointBackgroundColor,
                borderColor: colors.borderColor,
                backgroundColor: colors.backgroundColor,
                boderWidth: colors.borderWidth
              },
              {
                label: "reps",
                data: maxValues.map(v => v.reps),
                hidden: true,
                pointBorderColor: colors.pointBorderColor,
                pointBackgroundColor: colors.pointBackgroundColor,
                borderColor: colors.borderColor,
                backgroundColor: colors.backgroundColor,
                boderWidth: colors.borderWidth
              },
              {
                label: "rest",
                data: maxValues.map(v => v.rest),
                hidden: true,
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
    const { stats, units, classes, chart } = this.props;
    return (
      <div className={`${classes.container}`}>
        <div className={`${classes.chartContainer}`}>
          <canvas className={`${chart ? classes.chart : classes.noChart}`} ref={this.chart}></canvas>
        </div>
        <div className={`${classes.numbersContainer}`}>
          <div className={`${classes.nameValueContainer}`}>
            <Typography component="p" className={`${classes.name}`}>
              All Time Max
            </Typography>
            <Typography component="p" className={`${classes.value}`}>{`${stats.allTimeMax.toFixed(2)} ${units}`}</Typography>
          </div>
          <div className={`${classes.nameValueContainer}`}>
            <Typography component="p" className={`${classes.name}`}>
              Average Max
            </Typography>
            <Typography component="p" className={`${classes.value}`}>{`${stats.averageMax.toFixed(2)} ${units}`}</Typography>
          </div>
          <div className={`${classes.nameValueContainer}`}>
            <Typography component="p" className={`${classes.name}`}>
              All Time Average
            </Typography>
            <Typography component="p" className={`${classes.value}`}>{`${stats.allTimeAverage.toFixed(2)} ${units}`}</Typography>
          </div>
          <div className={`${classes.nameValueContainer}`}>
            <Typography component="p" className={`${classes.name}`}>
              Count
            </Typography>
            <Typography component="p" className={`${classes.value}`}>
              {stats.maxValues.length}
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withTheme(Stats));
