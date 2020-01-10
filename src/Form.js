import React, { useContext } from "react";
import { Link } from 'react-router-dom';
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
import {ThemeContext} from './contexts/ThemeContext';


function Form(props) {
    const { isDarkMode } = useContext(ThemeContext);
    const { classes } = props;
  return (
      <main className={classes.main}>
        <Paper className={classes.paper} style={{ background: isDarkMode ? "#2E3B55" : "white"}}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant='h5'>Sign In</Typography>
          <form className={classes.form}>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='email'>Email</InputLabel>
              <Input id='email' name='email' autoFocus />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input id='password' name='password' autoFocus />
            </FormControl>
            <Link to="/items">
            <Button
              variant='contained'
              type='submit'
              fullWidth
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>
            </Link>
          </form>
        </Paper>
      </main>
  )
}

// class Form extends Component {
//   static contextType = LanguageContext;
//   render() {
    
//     return (
      
//     );
//   }
// }
export default withStyles(styles)(Form);