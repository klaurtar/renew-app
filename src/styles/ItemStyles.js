const styles = theme => ({
  root: {
    padding: "1rem 1rem 1rem 1rem",
    display: "flex",
    justifyContent: "space-around"
  },
  flexBox: {
    display: "flex",
    justifyContent: "center",
    width: "100%"
  },
  image: {
    width: "33%",
    display: "block",
    margin: "0 auto"
  },
  one: {
    width: "16.66%"
  },
  name: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "16.66%"
  },
  price: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "16.66%"
  },
  views: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "16.66%"
  },
  description: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "16.66%",
    overflow: "hidden"
  },
  actions: {
    width: "16.66%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    "& button": {
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
        cursor: "pointer",
      },
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
