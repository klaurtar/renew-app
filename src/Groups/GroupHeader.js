import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import styles from "../styles/GroupHeaderStyles";
import { withStyles } from "@material-ui/core";
import { ThemeContext } from "../contexts/ThemeContext";

function GroupHeader(props) {
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
          Group List
        </div>
        <Link to="/items/new" style={{textDecoration: "none"}}>
          <Button
            variant="contained"
            className={isDarkMode ? classes.createDark : classes.createLight}
          >
            New Group +
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default withStyles(styles)(GroupHeader);
