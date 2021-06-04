import Tab from '../Users/Components/Tab/Tab';
import styles from './LoginSignup.module.css';
import {
    LINK_LOGIN, 
    LINK_SIGNUP, 
    USER_TYPE_STUDENT, 
    USER_TYPE_PROFESSOR, 
    USER_TYPE_EMPLOYEE,
} from '../Constants'
import {useLocation} from 'react-router-dom';
import {useState} from 'react'

const LoginSignup = () => {
    let location = useLocation();
    
    const [userType, setUserType] = useState(USER_TYPE_STUDENT);

    const onChangeRadioValue = (event) => {
        //console.log("Radio Val Changed!!");
        setUserType(event.target.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log("Submit");
    };

    //console.log(userType);

    return (
        <main className={styles.login_signup}>
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
                        <input className={`${styles.input_text} font1`} type="text" placeholder="Enter Email" name="email" required/>
                        <input className={`${styles.input_text} font1`} type="password" placeholder="Enter Password" name="psw" required/>
                        <button className={`${styles.input_button} font1 bold`} type="submit">Login</button>
                    </div>
                }
                {location.pathname.includes(LINK_SIGNUP) && 
                    <div className={styles.fields}>
                        <input className={`${styles.input_text} font1`} type="text" placeholder="Enter Signup Key" name="key" required/>
                        <input className={`${styles.input_text} font1`} type="text" placeholder="Enter Name" name="name" required/>
                        <input className={`${styles.input_text} font1`} type="text" placeholder="Enter Email" name="email" required/>
                        <input className={`${styles.input_text} font1`} type="password" placeholder="Enter Password" name="psw" required/>
                        <input className={`${styles.input_text} font1`} type="password" placeholder="Re-Enter Password" name="re_psw" required/>
                        {userType === USER_TYPE_EMPLOYEE && <input className={`${styles.input_text} font1`} type="text" placeholder="Enter Department Name" name="department_name" required/>}
                        {userType !== USER_TYPE_EMPLOYEE && <input className={`${styles.input_text} font1`} type="text" placeholder="Enter Department Id" name="department_id" required/>}
                        <button className={`${styles.input_button} font1 bold`} type="submit">Signup</button>
                    </div>
                }
            </form>
        </main>
    );
};
 
export default LoginSignup;