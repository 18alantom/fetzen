import { darken } from "@material-ui/core/styles/colorManipulator";

const styles = theme => {
  return {
    title: {
      fontFamily: theme.typography.titleFontFamily,
      color: theme.palette.primary.main,
      letterSpacing: "5px",
      fontSize: "2rem",
      padding: "8px 32px"
    },
    navbar: {
      zIndex: theme.zIndex.drawer + 1,
      background: theme.palette.secondary.dark,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      height: "4rem",
      gridArea: "navbar"
    },
    linkContainer: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center"
    },
    link: {
      color: darken(theme.palette.primary.main, 0.2),
      background: "transparent",
      border: "none",
      letterSpacing: "2px",
      fontSize: "1.2rem",
      padding: "0px 32px 0px 0px",
      cursor: "pointer",
      transitionDuration: "200ms",
      outline: "none",
      "&:hover": {
        color: theme.palette.primary.main
      }
    }
  };
};

export default styles;
