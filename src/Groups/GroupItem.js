import React, { useContext } from "react";
import styles from "../styles/GroupItemStyles";
import { withStyles } from "@material-ui/core";
import { ThemeContext } from "../contexts/ThemeContext";

function GroupItem(props) {
  const { isDarkMode } = useContext(ThemeContext);
  const { classes} = props;
  return (
    <div
      className={`${classes.root} ${
        isDarkMode ? classes.textDark : classes.textLight
      } ${isDarkMode ? classes.borderDark : classes.borderLight}`}
    >
      
        <div className={classes.name}>{props.name}</div>
      
      <a className={classes.url} href={props.url}>{props.name} Link</a>
      <div className={classes.description}>{props.description}</div>
    
      <div className={classes.actions}>
      <button><i className="far fa-edit fa-2x" style={{color: "green"}}></i></button>
      <button><i className="fas fa-trash fa-2x" style={{color: "red"}} onClick={() => props.handleClick(props.id)}></i></button>
      </div>
    </div>
  );
}

export default withStyles(styles)(GroupItem);
