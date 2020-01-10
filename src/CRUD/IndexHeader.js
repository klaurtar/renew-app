import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import styles from "../styles/IndexHeaderStyles";
import { withStyles } from "@material-ui/core";
import { ThemeContext } from "../contexts/ThemeContext";

function IndexHeader(props) {
  const { isDarkMode } = useContext(ThemeContext);
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div
          className={`${classes.header} ${
            isDarkMode ? classes.darkText : classes.lightText
          } `}
        >
          Welcome, Ryan!
        </div>
        <Button
          variant="contained"
          type="submit"
          className={isDarkMode ? classes.createDark : classes.createLight}
        >
          New Post +
        </Button>
      </div>
    </div>
  );
}

export default withStyles(styles)(IndexHeader);
