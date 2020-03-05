import React, { useContext, useState } from "react";
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

  const [windowSizeState, setWindowSizeState] = useState(window.innerWidth);

  console.log("This is the width of your viewport: " + windowSizeState);

  const [mobileHamburgerOpen, setMobileHamburger] = useState(false);

  const handleClick = () => {
    fetch(process.env.REACT_APP_SERVER + "auth", {
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

  const handleMobileClick = () => {
    setMobileHamburger(!mobileHamburgerOpen);
    console.log(mobileHamburgerOpen);
  };
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ background: isDarkMode ? "#2E3B55" : "#715AFF" }}
      >
        <Toolbar style={{padding: windowSizeState < 450 && '0 0 0 0'}}>
          {windowSizeState >= 450 && (
            <>
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
              >
                {isDarkMode ? "🌚" : "🌞"}
              </Typography>
              <Switch onChange={toggleTheme} />
            </>
          )}

          <div className={classes.grow} />
          {loggedIn && windowSizeState >= 450 && (
            <div className={classes.loggedIn}>
              <div className={classes.navlinks}>
                <div className={classes.mobileAccordion}>
                  <NavLink
                    to="/items"
                    activeStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
                  >
                    Items
                  </NavLink>
                  <NavLink
                    to="/facebookitems"
                    activeStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
                  >
                    <i className="fab fa-facebook-square"></i> Posts
                  </NavLink>
                  <NavLink
                    to="/groups"
                    activeStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
                  >
                    <i className="fab fa-facebook-square"></i> Groups
                  </NavLink>
                </div>
              </div>

              <Button
                className={(classes.logOutButton, classes.mobileLogOut)}
                variant="contained"
                color="secondary"
                onClick={handleClick}
              >
                Log Out
              </Button>
              {/* <Button
                className={classes.hamburgerMenu}
                variant="contained"
                color="primary"
                onClick={handleMobileClick}
              >
                <i className="fas fa-bars"></i>
              </Button> */}
            </div>
          )}
          {windowSizeState < 450 && (
            <div className={classes.flexHolder}>
              <div className={classes.mobileThemeSwitch}>
                <div className={classes.switchHolder}>
                  <Typography
                    className={classes.title}
                    variant="h6"
                    color="inherit"
                  >
                    {isDarkMode ? "🌚" : "🌞"}
                  </Typography>
                  <Switch onChange={toggleTheme} />
                </div>

                <div style={{display: loggedIn ? 'block' : 'none', marginRight: '.3rem'}}>
                  <Button
                    className={classes.hamburgerMenu}
                    variant="contained"
                    color="primary"
                    onClick={handleMobileClick}
                  >
                    <i className="fas fa-bars"></i>
                  </Button>
                </div>
              </div>
              <div className={classes.mobileOnly} style={{display: mobileHamburgerOpen ? 'flex' : 'none'}}>
                <NavLink
                  to="/items"
                  activeStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
                >
                  Items
                </NavLink>
                <NavLink
                  to="/facebookitems"
                  activeStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
                >
                  <i className="fab fa-facebook-square"></i> Posts
                </NavLink>
                <NavLink
                  to="/groups"
                  activeStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
                >
                  <i className="fab fa-facebook-square"></i> Groups
                </NavLink>

                <Button
                  className={classes.logOutButton}
                  variant="contained"
                  color="secondary"
                  onClick={handleClick}
                >
                  Log Out
                </Button>
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default withStyles(styles)(Navbar);
