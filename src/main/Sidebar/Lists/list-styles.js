const styles = theme => {
  return {
    titleContainer: {
      display: "flex",
      justifyContent: "space-between"
    },
    listTitleText: {
      padding: 0,
      margin: "12px 16px 8px",
      fontSize: "0.8em",
      textTransform: "uppercase",
      cursor: "pointer",
      // color: theme.palette.primary.main
      color: theme.palette.secondary.main
    },
    collapseButton: {
      width: "1.5rem",
      height: "1.5rem",
      margin: "8px 8px 8px 0px",
      color: theme.palette.secondary.main,
      padding: "0px",
      minWidth: "0px"
    },

    list: {
      // color: theme.palette.primary.light,
      color: theme.palette.secondary.dark,
      padding: 0
    },
    listItemIcon: {
      // color: theme.palette.primary.light
      color: theme.palette.secondary.dark
    },
    listItem: {
      padding: "4px 16px"
    },
    addButtonContainer: {
      width: "100%"
    },
    addButton: {
      display: "block",
      margin: "8px auto",
      // color: theme.palette.primary.main
      color: theme.palette.secondary.dark
    }
  };
};
export default styles;
