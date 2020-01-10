import React, { useContext } from "react";
import styles from "../styles/ItemStyles";
import { withStyles } from "@material-ui/core";
import { ThemeContext } from "../contexts/ThemeContext";

function Item(props) {
  const { isDarkMode } = useContext(ThemeContext);
  const { classes } = props;
  return (
    <div
      className={`${classes.root} ${
        isDarkMode ? classes.textDark : classes.textLight
      } ${isDarkMode ? classes.borderDark : classes.borderLight}`}
    >
      <div className={classes.one}>
        <img className={classes.image} src={props.image} />
      </div>
      <div className={classes.name}>{props.name}</div>
      <div className={classes.price}>{props.price}</div>
      <div className={classes.views}>{props.views}</div>
    </div>
  );
}

export default withStyles(styles)(Item);
