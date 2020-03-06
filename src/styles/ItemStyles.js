const styles = theme => ({
  root: {
    padding: "1rem 1rem 1rem 1rem",
    display: "flex",
    justifyContent: "space-around"
  },
  flexBox: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    [theme.breakpoints.down('sm')]: {
      justifyContent: "space-between"
    }
  },
  image: {
    width: "33%",
    display: "block",
    margin: "0 auto",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      borderRadius: "15px"
    }
  },
  one: {
    width: "16.66%",
    [theme.breakpoints.down('sm')]: {
      width: "30%",
      display: "flex",
      alignItems: 'center'
    }
  },
  name: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "16.66%",
    [theme.breakpoints.down('sm')]: {
      width: "30%"
    }
  },
  price: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "16.66%",
    [theme.breakpoints.down('sm')]: {
      display: "none"
    }
  },
  views: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "16.66%",
    [theme.breakpoints.down('sm')]: {
      display: "none"
    }
  },
  description: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "16.66%",
    overflow: "hidden",
    [theme.breakpoints.down('sm')]: {
      display: "none"
    }
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
      [theme.breakpoints.down('sm')]: {
        flexDirection: "column",
        width: "30%",
        "& i": {
          margin: ".7rem 0 .7rem 0"
        }
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
