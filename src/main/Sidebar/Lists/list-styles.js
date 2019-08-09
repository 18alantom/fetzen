const styles = theme => {
  return {
    listTitleText: {
      padding: 0,
      margin: "12px 16px 8px",
      fontSize: "0.8em",
      textTransform: "uppercase",
      color: theme.palette.primary.main
    },
    list: {
      color: theme.palette.primary.light,
      padding: 0
    },
    listItemIcon: {
      color: theme.palette.primary.light
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
      color: theme.palette.primary.main
    }
  };
};
export default styles;
