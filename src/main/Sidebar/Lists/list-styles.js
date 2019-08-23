const styles = theme => {
  return {
    listTitleText: {
      padding: 0,
      margin: "12px 16px 8px",
      fontSize: "0.8em",
      textTransform: "uppercase",
      // color: theme.palette.primary.main
      color: theme.palette.secondary.main
    },
    list: {
      // color: theme.palette.primary.light,
      color: theme.palette.secondary.dark,
      padding: 0
    },
    listItemIcon: {
      // color: theme.palette.primary.light
      color: theme.palette.secondary.dark,
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
      color: theme.palette.secondary.dark,
    }
  };
};
export default styles;
