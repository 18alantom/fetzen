import { darken } from "@material-ui/core/styles/colorManipulator";

const styles = theme => {
  return {
    container: {
      width: "100%"
    },
    chartContainer: {},
    chart: {
      width: "100%",
      height: "300px"
    },
    noChart: {
      width: "100%",
      height: "300px"
    },
    numbersContainer: {
      display: "grid",
      gridTemplate: "1fr 1fr / 1fr 1fr",
      gridGap: "8px 64px",
      marginTop: "32px",
      marginBottom: "16px"
    },
    nameValueContainer: {
      display: "flex",
      justifyContent: "space-between"
    },
    name: {
      color: darken(theme.palette.primary.main, 0.2),
      fontSize: "1rem"
    },
    value: {
      color: darken(theme.palette.primary.main, 0),
      fontSize: "1rem"
    }
  };
};

export default styles;
