import Tab from '../Users/Components/Tab/Tab';
import styles from './LoginSignup.module.css';
import {
    LINK_LOGIN, 
    LINK_SIGNUP, 
    USER_TYPE_STUDENT, 
    USER_TYPE_PROFESSOR, 
    USER_TYPE_EMPLOYEE,
    AUTHENTICATION_TYPE_LOGIN, 
    AUTHENTICATION_TYPE_SIGNUP,
    STATUS_LOADING,
    STATUS_FAILED, 
    STATUS_SUCCEEDED,
    AUTHENTICATION_STATE_KEY,
    LINK_PROFESSOR,
    LINK_STUDENT
} from '../Constants'
import {Redirect, useLocation, useHistory} from 'react-router-dom';
import {useState} from 'react'
import {loginSignupRequest, selectAuthentication, loadAuthenticationStateCookie} from '../Store/AuthenticationSlice'
import {useSelector, useDispatch} from 'react-redux';


const LoginSignup = () => {
    const authenticationState = useSelector(selectAuthentication);
    const dispatch = useDispatch();

    let history = useHistory();
    let location = useLocation();

    if (localStorage.getItem(AUTHENTICATION_STATE_KEY))
        dispatch(loadAuthenticationStateCookie())

    if (authenticationState.status === STATUS_SUCCEEDED && 
        location.pathname.includes(LINK_LOGIN)) {
        
        switch (authenticationState.userType) {
            case USER_TYPE_STUDENT:
                history.push(LINK_STUDENT);
                break;
            case USER_TYPE_PROFESSOR:
                history.push(LINK_PROFESSOR);
                break;
            default: //USER_TYPE_EMPLOYEE
                //history.push(LINK_EMPLOYEE);
                break;
        }
    }
 
    
    const [userType, setUserType] = useState(USER_TYPE_STUDENT);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupKey, setSignupKey] = useState('');
    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConformationPassword, setSignupConformationPassword] = useState('');
    const [signupDepName, setSignupDepName] = useState('');
    const [signupDepId, setSignupDepId] = useState('');

    const onChangeRadioValue = (event) => setUserType(event.target.value);
    const onChangeLoginEmail = (event) => setLoginEmail(event.target.value);
    const onChangeLoginPassword = (event) => setLoginPassword(event.target.value);
    const onChangeSignupKey = (event) => setSignupKey(event.target.value);
    const onChangeSignupName = (event) => setSignupName(event.target.value);
    const onChangeSignupEmail = (event) => setSignupEmail(event.target.value);
    const onChangeSignupPassword = (event) => setSignupPassword(event.target.value);
    const onChangeSignupConformationPassword = (event) => setSignupConformationPassword(event.target.value);
    const onChangeSignupDepName = (event) => setSignupDepName(event.target.value);
    const onChangeSignupDepId = (event) => setSignupDepId(event.target.value);

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let loginBody = {
            "email": loginEmail,
            "password": loginPassword
        };

        let studentProfessorSignupBody = {
            "key": signupKey,
            "user": {
                "name": signupName,
                "email": signupEmail,
                "password": signupPassword,
                "passwordConfirm": signupConformationPassword,
                "departmentId": signupDepId
            }
        };

        let departmentSignupBody = {
            "key": "123123",
            "department": {
                "name": signupName,
                "email": signupEmail,
                "password": signupPassword,
                "passwordConfirm": signupConformationPassword,
                "departmentName": signupDepName
            }
        };

        let chosenBody;
        if (location.pathname.includes(LINK_LOGIN)) chosenBody = loginBody;
        else if (userType === USER_TYPE_EMPLOYEE) chosenBody = departmentSignupBody;
        else chosenBody = studentProfessorSignupBody;

        let params = {
            userType: userType, 
            authenticationType: location.pathname.includes(LINK_LOGIN) ? AUTHENTICATION_TYPE_LOGIN : AUTHENTICATION_TYPE_SIGNUP,
            body: chosenBody
        };
        dispatch(loginSignupRequest(params));
        //console.log(event);
    };

    return (

        <main className={styles.login_signup}>

            {(authenticationState.status === STATUS_SUCCEEDED && 
                location.pathname.includes(LINK_LOGIN)) &&
                (authenticationState.userType === USER_TYPE_PROFESSOR) && <Redirect to={LINK_PROFESSOR}/>
            }

            <div className={styles.tabs}>
                <Tab text='Login' link={LINK_LOGIN}/>
                <Tab text='Signup' link={LINK_SIGNUP}/>
            </div>
            <form className={styles.form} onSubmit={onSubmitHandler}>
                <div className={`${styles.radios} font2`}>
                    <div className={styles.radio_label}>
                        <input type="radio" id="studentRadio" value={USER_TYPE_STUDENT} name="userType" onChange={onChangeRadioValue} checked={userType === USER_TYPE_STUDENT}/> 
                        <label htmlFor="studentRadio">Student</label>
                    </div>

                    <div className={styles.radio_label}>
                        <input type="radio" id="professorRadio" value={USER_TYPE_PROFESSOR} name="userType" onChange={onChangeRadioValue} checked={userType === USER_TYPE_PROFESSOR}/> 
                        <label htmlFor="professorRadio">Professor</label>
                    </div>
                    
                    <div className={styles.radio_label}>
                        <input type="radio" id="employeeRadio" value={USER_TYPE_EMPLOYEE} name="userType" onChange={onChangeRadioValue} checked={userType === USER_TYPE_EMPLOYEE}/> 
                        <label htmlFor="employeeRadio">Employee</label>
                    </div>

                </div>
                {location.pathname.includes(LINK_LOGIN) && 
                    <div className={styles.fields}>
                        <input className={`${styles.input_text} font1`} type="email" placeholder="Enter Email" name="email" onChange={onChangeLoginEmail} required/>
                        <input className={`${styles.input_text} font1`} type="password" placeholder="Enter Password" name="psw" onChange={onChangeLoginPassword} required/>
                        <button className={`${styles.input_button} font1 bold`} type="submit">Login</button>
                    </div>
                }
                {location.pathname.includes(LINK_SIGNUP) && 
                    <div className={styles.fields}>
                        <input className={`${styles.input_text} font1`} type="text" placeholder="Enter Signup Key" name="key" onChange={onChangeSignupKey} required/>
                        <input className={`${styles.input_text} font1`} type="text" placeholder="Enter Name" name="name" onChange={onChangeSignupName} required/>
                        <input className={`${styles.input_text} font1`} type="email" placeholder="Enter Email" name="email" onChange={onChangeSignupEmail} required/>
                        <input className={`${styles.input_text} font1`} type="password" placeholder="Enter Password" name="psw" onChange={onChangeSignupPassword} required/>
                        <input className={`${styles.input_text} font1`} type="password" placeholder="Re-Enter Password" name="re_psw" onChange={onChangeSignupConformationPassword} required/>
                        {userType === USER_TYPE_EMPLOYEE && <input className={`${styles.input_text} font1`} type="text" placeholder="Enter Department Name" name="department_name" onChange={onChangeSignupDepName} required/>}
                        {userType !== USER_TYPE_EMPLOYEE && <input className={`${styles.input_text} font1`} type="text" placeholder="Enter Department Id" name="department_id" onChange={onChangeSignupDepId} required/>}
                        <button className={`${styles.input_button} font1 bold`} type="submit" >Signup</button>
                    </div>
                }
                {authenticationState.status === STATUS_LOADING && <p className='font2 bold center_text'>Loading...</p>}
                {authenticationState.status === STATUS_FAILED && <p className='font2 bold center_text'>{authenticationState.error.message}</p>}
                {/*console.log(authenticationState)*/}
                {(authenticationState.status === STATUS_SUCCEEDED && 
                    location.pathname.includes(LINK_SIGNUP)) &&
                    <p className='font2 bold center_text'>Successful signup, you can login now.</p>
                }
            </form>
        </main>
    );
};
 
export default LoginSignup;