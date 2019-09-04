import { darken } from "@material-ui/core/styles/colorManipulator";

const styles = theme => {
  return {
    container: {
      backgroundColor: theme.palette.secondary.main,
      padding: "16px",
      textAlign: "center",
      minWidth: "500px",
      maxWidth: "700px"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "16px"
    },
    setsCount: {
      color: darken(theme.palette.primary.main, 0.2),
      fontSize: "1.2rem",
      marginTop: "4px"
    },
    setContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "8px"
    },
    setsContainer: {},
    rest: {
      justifySelf: "end"
    },
    title: {
      width: "300px",
      padding: "0px"
    },
    detail: {
      width: "80px",
      color: theme.palette.primary.main
    },
    buttonContainer: {
      marginTop: "14px",
      display: "flex",
      justifyContent: "space-between"
    },
    addRemoveButton: {
      marginTop: "4px",
      height: "24px",
      width: "24px"
    },
    note: {
      margin: "12px 0px 8px 0px"
    },
    setContainerOuter: {
      display: "grid",
      gridTemplateColumns: "30px auto"
    },
    index: {
      textAlign: "start",
      marginTop: "14px",
      color: darken(theme.palette.primary.main, 0.3)
    },
    button: {
      color: darken(theme.palette.primary.main, 0.3),
      padding: "0px",
      "&:disabled": {
        color: theme.palette.secondary.main
      },
      "&:hover": {
        backgroundColor: "transparent",
        color: darken(theme.palette.primary.main, 0.1)
      },
      "&:focus": {
        color: darken(theme.palette.primary.main, 0.1)
      }
    },
    error: {
      textAlign: "center",
      textTransform: "uppercase",
      fontSize: "0.8em",
      letterSpacing: "1px"
    }
  };
};

export default styles;
