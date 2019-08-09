import Image from "./assets/bg_image_half_res.jpg";
const styles = theme => {
  return {
    titleBox: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    title: {
      color: theme.palette.primary.main,
      fontFamily: theme.typography.titleFontFamily,
      letterSpacing: "10px",
      fontSize: "6rem",
      textShadow: "0px 1px 4px rgba(0,0,0,0.7)"
    },
    subtitle: {
      color: theme.palette.primary.main,
      fontFamily: theme.typography.titleFontFamily,
      fontWeight: 400,
      letterSpacing: "8px",
      fontSize: "1.4rem",
      textShadow: "0px 1px 4px rgba(0,0,0,0.7)"
    },
    container: {
      height: "100%",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      background: `url(${Image})`,
      backgroundSize: "cover"
    }
  };
};

export default styles;
