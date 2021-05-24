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
const Sidebar = ({navItems, isSidebarOpen}) => {

    let style = styles.sidebar;

    if (isSidebarOpen) {
        style = `${styles.sidebar} ${styles.sidebar_open}`;
        //console.log(style);
    } else {
        style = styles.sidebar;
        //console.log(style);
    }

    return (
        <nav className={style} id='sidebar'>
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
        </nav>
    );
}
 
export default Sidebar;