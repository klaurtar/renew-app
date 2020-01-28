import React, { useContext } from 'react';
import {ThemeContext} from './contexts/ThemeContext';

// import { LoggedInContext } from "./contexts/LoggedIn";


function PageContent(props) {
    const { isDarkMode } = useContext(ThemeContext);
    // const {loggedIn} = useContext(LoggedInContext);
    const styles = {
                     backgroundColor: isDarkMode ? "black" : "white",
                     minHeight: "100vh",
                     width: "100vw"
                 }
    return (
        <div style={styles}>
            {props.children}
        </div>
    )
}

// class PageContent extends Component {
//     static contextType = ThemeContext;
//     constructor(props) {
//         super(props);
//         this.state = {  }
//     }
//     render() { 
//         const { isDarkMode } = this.context;
//         const styles = {
//             backgroundColor: isDarkMode ? "black" : "white",
//             height: "100vh",
//             width: "100vw"
//         }
//         return (
//             <div style={styles}>
//                 {this.props.children}
//             </div>
//         );
//     }
// }
 
export default PageContent;