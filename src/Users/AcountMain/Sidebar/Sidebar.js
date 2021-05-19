import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css'
/*
navItems = [
    {text:String, link:String, id:Number}, 
    {text:String, link:String, id:Number}, 
    ...
]
*/
const Sidebar = ({navItems}) => {
    return (
        <nav className={styles.sidebar}>
            <ul>
                {
                    navItems.map(
                        item => (
                            <Link to={item.link} key={item.id}><li>{item.text}</li></Link>
                        )
                    )
                }
            </ul>
        </nav>
    );
}
 
export default Sidebar;