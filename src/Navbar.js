import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/NavBarStyles";
import { ThemeContext } from "./contexts/ThemeContext";


function Navbar(props){
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const { classes } = props;
    return (
      <div className={classes.root}>
        <AppBar position='static' style={{ background: isDarkMode ? '#2E3B55' : '#715AFF' }}>
          <Toolbar>
            <Typography className={classes.title} variant='h6' color='inherit'>
              {isDarkMode ? "🌚" : "🌞"}
            </Typography>
            <Switch onChange={toggleTheme} />
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
      </div>
    );

}
export default withStyles(styles)(Navbar);