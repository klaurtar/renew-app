import React, { useContext } from "react";
import styles from "../styles/FbItemStyles";
import { withStyles } from "@material-ui/core";
import { ThemeContext } from "../contexts/ThemeContext";
import moment from "moment";

function FbItem(props) {
  const { isDarkMode } = useContext(ThemeContext);
  const { classes } = props;

  return (
    <div
      className={`${classes.root} ${
        isDarkMode ? classes.textDark : classes.textLight
      } ${isDarkMode ? classes.borderDark : classes.borderLight}`}
    >
      <div className={classes.name}>{props.id}</div>
      <div className={classes.name}>{props.itemId}</div>

      <a className={classes.url} href={props.url} target="blank">
        Link
      </a>
      <div className={classes.publishedAt}>
        {moment(props.publishedAt).format('dddd, MMMM Do, YYYY h:mm:ss A')}
      </div>

      <div className={classes.actions}>
        <button>
          <i
            className="fas fa-trash fa-2x"
            style={{ color: "red" }}
            onClick={() => props.handleDeleteFbItemClick(props.id)}
          ></i>
        </button>
      </div>
    </div>
  );
}

export default withStyles(styles)(FbItem);
