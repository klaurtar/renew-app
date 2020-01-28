import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles/FormStyles";
import { ThemeContext } from "./contexts/ThemeContext";

export default function SignUp(props) {
    const { isDarkMode } = useContext(ThemeContext);
    const [isSignUp, setSignUp] = useState(false);
    const { classes } = props;

    const handleClick = () => {
        setSignUp(true);
      };
    return (
        
    )
}