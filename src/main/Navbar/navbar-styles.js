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
      height: "4rem",
      gridArea: "navbar"
    }
  };
};

export default styles;
