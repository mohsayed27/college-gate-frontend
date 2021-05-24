import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useState} from 'react'
import styles from './AccountMain.module.css'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'

/*
navItemsAndComponents = [
    {text:String, link:String, component:<ReactComponent/>, id:Number}, 
    {text:String, link:String, component:<ReactComponent/>, id:Number}, 
    ...
]
*/

const AccountMain = ({navItemsAndComponents}) => {

    const navItems = navItemsAndComponents.map(item => ({text:item.text, link:item.link, id:item.id}));


    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    let backdropStyle = styles.backdrop;

    const sidebarShowHideHandler = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (isSidebarOpen) {
        backdropStyle = `${styles.backdrop} ${styles.backdrop_displayed}`;
        //console.log(backdropStyle);
    } else {
        backdropStyle = styles.backdrop;
        //console.log(backdropStyle);
    }

    return (
       
        <main className={styles.account_main}>
            <Header hamburgerClickHandler={sidebarShowHideHandler}/>
            <Sidebar navItems={navItems} isSidebarOpen={isSidebarOpen}/>
            <section className={styles.account_main_section}>
                <div className={backdropStyle} onClick={sidebarShowHideHandler}></div>
                <Switch>
                    {navItemsAndComponents.map(item => (
                        <Route path={item.link} key={item.id}>
                            <>{item.component}</>
                        </Route>
                    ))}                     
                </Switch>
            </section>
        </main>
        
    );
}
 
export default AccountMain;