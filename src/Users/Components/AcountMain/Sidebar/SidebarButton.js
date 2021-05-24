import {useLocation} from 'react-router-dom'

const SidebarButton = ({text, link}) => {

    let style = 'font2';
    if (useLocation().pathname == link) {
        style = `font2 bold`;
    } else {
        style = `font2`;
    }

    return (
        <p className={style}>{text}</p>
    );
}
 
export default SidebarButton;