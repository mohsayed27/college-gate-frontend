import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css'
import SidebarButton from './SidebarButton'

/*
navItems = [
    {text:String, link:String, id:Number}, 
    {text:String, link:String, id:Number}, 
    ...
]
*/
const Sidebar = ({navItems, additionalComponent}) => {

    return (
        <nav className={styles.sidebar}>
            <ul>
                {
                    navItems.map(
                        item => (
                            <Link to={item.link} key={item.id}>
                                <li>
                                    <SidebarButton text={item.text} link={item.link}/>
                                </li>
                            </Link>
                        )
                    )
                }
            </ul>
            <>{additionalComponent}</>
        </nav>
    );
}
 
export default Sidebar;