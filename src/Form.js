import React, { useContext, useState } from "react";
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
import { ThemeContext } from "./contexts/ThemeContext";

function Form(props) {
  const { isDarkMode } = useContext(ThemeContext);
  const [isSignUp, setSignUp] = useState(false);
  const { classes } = props;

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleEmailChange = e => {
    setEmailValue(e.target.value);
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

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (!isSignUp) {
      try {
        const response = await fetch('http://localhost:8181/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: emailValue,
            password: passwordValue
          })
        });


        const responseData = await response.json();
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await fetch("http://localhost:8181/auth", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: emailValue,
            password: passwordValue
          })
        });

        const responseData = await response.json();
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    }
  };

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
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" name="email" value={emailValue} onChange={handleEmailChange} autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input id="password" name="password" value={passwordValue} onChange={handlePasswordChange} autoFocus />
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
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                value={emailValue}
                onChange={handleEmailChange}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
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
