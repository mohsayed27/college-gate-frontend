import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect,  } from 'react-router-dom';
import Professor from './Users/Professor';
import Student from './Users/Student';
import {
    LINK_PROFESSOR, 
    LINK_STUDENT, 
    LINK_LOGIN,
    AUTH_LINK,
    LINK_EMPLOYEE, 
} from './Constants'
import LoginSignup from './LoginSignup/LoginSignup';
import Employee from './Users/Employee';

function App() {
    return (

      
        <Router>
            <Switch>
                <Route path={['/', AUTH_LINK]} exact={true}>
                    <Redirect to={LINK_LOGIN}/>
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
                <Route path={LINK_EMPLOYEE}>
                    <Employee/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
