import logo from './logo.svg';
import './App.css';
import { HomePage } from './containers/HomePage';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Professor from './Users/Professor';
import Student from './Users/Student';
import {
    LINK_PROFESSOR, 
    LINK_STUDENT, 
    LINK_LOGIN, 
    LINK_SIGNUP,
    AUTH_LINK, 
    STATUS_SUCCEEDED, 
    AUTHENTICATION_STATE_KEY, 
    USER_TYPE_STUDENT, 
    USER_TYPE_PROFESSOR,
    AUTHENTICATION_TYPE_LOGIN
} from './Constants'
import LoginSignup from './LoginSignup/LoginSignup';
import {useSelector, useDispatch} from 'react-redux';
import {loginSignupRequest, selectAuthentication, loadAuthenticationStateCookie} from './Store/AuthenticationSlice'



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

    /*const authenticationState = useSelector(selectAuthentication);
    const dispatch = useDispatch();

    let location = useLocation();

    let redirect = false;
    let redirectLink = '';
  
    if (localStorage.getItem(AUTHENTICATION_STATE_KEY) !== null) {
        if (authenticationState.status !== STATUS_SUCCEEDED)
            dispatch(loadAuthenticationStateCookie())
    } else {
        redirect = true;
        redirectLink = LINK_LOGIN;
    }

    

    if (authenticationState.status === STATUS_SUCCEEDED && 
        authenticationState.authenticationType === AUTHENTICATION_TYPE_LOGIN) {
            
        //redirect = true;
        
        switch (authenticationState.userType) {
            case USER_TYPE_STUDENT:
                if (!location.pathname.includes(LINK_STUDENT)){
                    redirect = true;
                    redirectLink = LINK_STUDENT;
                }
                break;
            case USER_TYPE_PROFESSOR:
                if (!location.pathname.includes(LINK_PROFESSOR)){
                    redirect = true;
                    redirectLink = LINK_PROFESSOR;
                }
                break;
            default: //USER_TYPE_EMPLOYEE
                //if (!location.pathname.includes(LINK_EMPLOYEE)){
                //    redirect = true;
                //    redirectLink = LINK_EMPLOYEE;
                //}
                break;
        }
    }*/
  

    return (

      
        <Router>
            <Switch>
    
                {/*redirect && <Redirect to={redirectLink}/>*/}

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
