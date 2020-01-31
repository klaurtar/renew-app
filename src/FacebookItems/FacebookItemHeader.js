import React, { useContext } from "react";
import styles from "../styles/FacebookItemHeaderStyles";
import { withStyles } from "@material-ui/core";
import { ThemeContext } from "../contexts/ThemeContext";

function FacebookItemHeader(props) {
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
          Facebook Items
        </div>
        
      </div>
    </div>
  );
}

export default withStyles(styles)(FacebookItemHeader);
