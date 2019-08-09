import { fade } from "@material-ui/core/styles/colorManipulator";
const styles = theme => {
  return {
    container: {
      cursor: "pointer"
    },
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

export default styles;
