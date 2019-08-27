import { fade, darken } from "@material-ui/core/styles/colorManipulator";

const styles = theme => {
  return {
    form: {
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px",
      width: "288px",
      marginBottom: 8,
      background: fade(darken(theme.palette.secondary.dark, 0.8), 0.6),
      borderRadius: "0px",
      backdropFilter: "blur(4px)" // Only from chrome 76
    },
    loginTitle: {
      color: theme.palette.primary.light,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "4px"
    },
    textField: {
      marginBottom: "16px"
    },
    button: {
      marginTop: "8px",
      borderRadius: 0,
      background: fade(theme.palette.primary.main, 0.7),
      "&:hover": {
        background: fade(theme.palette.primary.main, 1)
      }
    },
    link: {
      textShadow: "0px 1px 2px black",
      textTransform: "uppercase",
      cursor: "pointer",
      color: theme.palette.primary.main,
      textAlign: "center"
    },
    message: {
      textAlign: "center",
      textTransform: "uppercase",
      fontSize: "0.8em",
      letterSpacing: "1px"
    },
    error: {
      color: theme.palette.error[400]
    },
    info: {
      color: theme.palette.success[400]
    }
  };
};

export default styles;
