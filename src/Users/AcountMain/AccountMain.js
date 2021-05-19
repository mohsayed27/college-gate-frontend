import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
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

    return (
       
        <div className={styles.account_main}>
            <Header/>
            <Sidebar navItems={navItems}/>
            <section className='content'>
                <Switch>
                    {navItemsAndComponents.map(item => (
                        <Route path={item.link}>
                            <>{item.component}</>
                        </Route>
                    ))}                     
                </Switch>
            </section>
        </div>
        
    );
}
 
export default AccountMain;