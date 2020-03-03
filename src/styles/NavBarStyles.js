import { fade } from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({
  root: {
    width: "100%",
    marginBottom: 0
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'block'
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(9),
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  loggedIn: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "2rem"
  },
  navlinks: {
    // [theme.breakpoints.down("sm")]: {
    //   position: 'absolute',
    //   backgroundColor: "rgba(0,0,0,.7)",
    //   top: '0%',
    //   right: '0%',
    //   width: '100vw',
    //   height: '100vh'
    // },
    "& a": {
      color: "white",
      fontWeight: "bold",
      fontSize: "1.5rem",
      textDecoration: "none",
      marginRight: '1rem',
      padding: ".5rem",
      borderRadius: "15px"
    },
    "& a:active": {
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    }
  },
  hamburgerMenu: {
    display: 'none',
    [theme.breakpoints.down("sm")]: {
      display: 'block',
      marginLeft: "auto",
      backgroundColor: "white",
      color: "#715AFF"
    }
  },
  logOutButton: {
    // [theme.breakpoints.down("sm")]: {
    //   display: 'none'
    // }
  }
});

export default styles;
