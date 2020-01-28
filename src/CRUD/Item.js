import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styles from "../styles/ItemStyles";
import { withStyles } from "@material-ui/core";
import { ThemeContext } from "../contexts/ThemeContext";

function Item(props) {
  const history = useHistory();
  const { isDarkMode } = useContext(ThemeContext);
  const { classes, handleDeleteItemClick, handleImmediateFacebookPost } = props;

  const editButton = () => {
    history.push(`/items/edit/${props.id}`);
  };
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
            src={`${process.env.REACT_APP_SERVER}item_photo_of/${props.image}`}
            alt={props.name}
          />
        </div>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.price}>${props.price}</div>
        <div className={classes.views}>{props.views}</div>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.actions}>
          <button onClick={editButton}>
            <i className="far fa-edit fa-2x" style={{ color: "green" }}></i>
          </button>
          <button onClick={() => handleDeleteItemClick(props.id)}>
            <i className="fas fa-trash fa-2x" style={{ color: "red" }}></i>
          </button>
          <button onClick={() => handleImmediateFacebookPost(props.id)}>
            <i class="fas fa-ghost fa-2x" style={{ color: "#715AFF" }}></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Item);
