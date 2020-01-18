import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/NavBarStyles";
import { LoggedInContext } from "./contexts/LoggedIn";
import { ThemeContext } from "./contexts/ThemeContext";

function Navbar(props) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { loggedIn, changeLogIn, token, setToken } = useContext(
    LoggedInContext
  );
  const { classes } = props;

  const handleClick = () => {
    fetch("http://localhost:8181/auth", {
      method: "DELETE",
      headers: {
        token: token
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // NOTE )-> update state here, not after fetch promise
        changeLogIn(false); // make it within promise callback
        setToken(); // make it within promise callback
      })
      .catch(error => console.log(error));
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ background: isDarkMode ? "#2E3B55" : "#715AFF" }}
      >
        <Toolbar>
          <Typography className={classes.title} variant="h6" color="inherit">
            {isDarkMode ? "🌚" : "🌞"}
          </Typography>
          <Switch onChange={toggleTheme} />
          <div className={classes.grow} />
          {loggedIn && (
            <div className={classes.loggedIn}>
              <div className={classes.navlinks}>
                <NavLink to="/items" activeStyle={{background: "rgba(0, 0, 0, 0.5)"}} exact>Items</NavLink>
                <NavLink to="/groups" activeStyle={{background: "rgba(0, 0, 0, 0.5)"}} exact>Groups</NavLink>
              </div>
              
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClick}
              >
                Log Out
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default withStyles(styles)(Navbar);
