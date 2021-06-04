import logo from './logo.svg';
import './App.css';
import { HomePage } from './containers/HomePage';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Professor from './Users/Professor';
import Student from './Users/Student';
import {
    LINK_PROFESSOR, 
    LINK_STUDENT, 
    LINK_LOGIN, 
    LINK_SIGNUP,
    AUTH_LINK
} from './Constants'
import LoginSignup from './LoginSignup/LoginSignup';

function App() {
    // return <div className="App">
    //   <HomePage/>
    // </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  

  

    return (

      
        <Router>
            <Switch>
                <Route path='/' exact={true}>
                    <Redirect to={LINK_LOGIN}/>
                    {/*<LoginSignup/>*/}
                </Route>
                <Route path={AUTH_LINK}>
                    <LoginSignup/>
                </Route>
                <Route path={LINK_PROFESSOR}>
                    <Professor/>
                </Route>
                <Route path={LINK_STUDENT}>
                    <Student/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
