import React, { useContext } from "react";
import styles from "../styles/ItemStyles";
import { withStyles } from "@material-ui/core";
import { ThemeContext } from "../contexts/ThemeContext";

function Item(props) {
  const { isDarkMode } = useContext(ThemeContext);
  const { classes, handleDeleteItemClick } = props;
  return (
    <div
      className={`${classes.root} ${
        isDarkMode ? classes.textDark : classes.textLight
      } ${isDarkMode ? classes.borderDark : classes.borderLight}`}
    >
      <div className={classes.flexBox}>
        <div className={classes.one}>
          <img
            className={classes.image}
            src={`http://localhost:8181/item_photo_of/${props.image}`}
            alt={props.name}
          />
        </div>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.price}>${props.price}</div>
        <div className={classes.views}>{props.views}</div>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.actions}>
          <button>
            <i className="far fa-edit fa-2x" style={{ color: "green" }}></i>
          </button>
          <button onClick={() => handleDeleteItemClick(props.id)}>
            <i className="fas fa-trash fa-2x" style={{ color: "red" }}></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Item);


