import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// import SignUp from './SignUp';
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles/FormStyles";
import { LoggedInContext } from "./contexts/LoggedIn";
import { ThemeContext } from "./contexts/ThemeContext";

function Form(props) {
  const { isDarkMode } = useContext(ThemeContext);
  const { loggedIn, changeLogIn } = useContext(LoggedInContext);
  const [isSignUp, setSignUp] = useState(false);
  const { classes } = props;

  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleUsernameChange = e => {
    setUsernameValue(e.target.value);
  };
  const handlePasswordChange = e => {
    setPasswordValue(e.target.value);
  };
  // const [value, setValue] = useState(initialVal);
  //   const handleChange = (e) => {
  //       setValue(e.target.value);
  //   };

  const handleClick = () => {
    setSignUp(!isSignUp);
  };
  const reset = () => {
    setUsernameValue("");
    setPasswordValue("");
  }

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (!isSignUp) {
      try {
        const response = await fetch("http://localhost:8181/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: usernameValue,
            password: passwordValue
          })
        });

        const responseData = await response.json();
        if (responseData.code === 200) {
          console.log("Success Response");
          changeLogIn(true);
          reset();
        }
        console.log("This is a response");
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response2 = await fetch("http://localhost:8181/auth", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: usernameValue,
            password: passwordValue
          })
        });

        const responseData2 = await response2.json();
        if (responseData2 === 201) {
          console.log("Successful Sign Up");
          reset();
        }
        console.log(responseData2);
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (loggedIn) {
    return <Redirect to="/items" />;
}

  return (
    <main className={classes.main}>
      {!isSignUp ? (
        <Paper
          className={classes.paper}
          style={{ background: isDarkMode ? "#2E3B55" : "white" }}
        >
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Sign In</Typography>
          <form className={classes.form} onSubmit={authSubmitHandler}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username1"
                name="username1"
                value={usernameValue}
                onChange={handleUsernameChange}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={passwordValue}
                onChange={handlePasswordChange}
                autoFocus
              />
            </FormControl>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="secondary"
            className={classes.submit}
            onClick={handleClick}
          >
            Switch to Sign up
          </Button>
        </Paper>
      ) : (
        <Paper
          className={classes.paper}
          style={{ background: isDarkMode ? "#2E3B55" : "white" }}
        >
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon color="primary" />
          </Avatar>
          <Typography variant="h5">Sign Up</Typography>
          <form className={classes.form} onSubmit={authSubmitHandler}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username2"
                name="username"
                value={usernameValue}
                onChange={handleUsernameChange}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={passwordValue}
                onChange={handlePasswordChange}
                autoFocus
              />
            </FormControl>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="secondary"
            className={classes.submit}
            onClick={handleClick}
          >
            Switch to Sign In
          </Button>
        </Paper>
      )}
    </main>
  );
}

// class Form extends Component {
//   static contextType = LanguageContext;
//   render() {

//     return (

//     );
//   }
// }
export default withStyles(styles)(Form);
