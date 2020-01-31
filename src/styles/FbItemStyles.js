const styles = theme => ({
  root: {
    padding: "1rem 1rem 1rem 1rem",
    display: "flex",
    justifyContent: "space-around"
  },
  name: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "25%"
  },
  url: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "25%"
  },
  publishedAt: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    fontSize: ".65rem"
  },
  // added: {
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: "20%"
  // },
  actions: {
    width: "25%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    "& button": {
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      cursor: "pointer"
    }
  },

  edit: {
    color: "green"
  },
  trash: {
    color: "red"
  },
  textDark: {
    color: "white"
  },
  textLight: {
    color: "black"
  },
  borderDark: {
    borderBottom: "1px solid #2E3B55"
  },
  borderLight: {
    borderBottom: "1px solid lightgrey"
  }
});

export default styles;
