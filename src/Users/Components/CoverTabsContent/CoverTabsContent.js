import {Link, BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Tab from '../Tab/Tab'
import styles from './CoverTabsContent.module.css'

/*
tabsAndComponents = [
    {iconImgSrc:String, text:String, routePath:String, exactPath:bool, link:String, component:<ReactComponent/>, id:Number}
]
*/

/*
additionalComponents = [
    {routePath:String, exactPath:bool, link:String, component:<ReactComponent/>, id:Number}
]
*/

const CoverTabsContent = ({coverImgSrc, avatarComponent, tabsAndComponents, additionalComponents, courseKey}) => {
    //console.log(coverImgSrc);
    //console.log(tabsAndComponents);
    return (
        <div className={styles.cover_tabs_content}>
            {<img className={styles.cover_img} src={coverImgSrc} alt="Cover image" />}
            {/*<div className={styles.test_div}></div>*/}

            <div className={styles.avatar_parent_div}>
                <div className={styles.avatar_child_div}>
                    <>{avatarComponent}</>
                </div>
            </div>

            <div className={styles.tabs}>
                {tabsAndComponents.map(item => (
                    <Tab iconImgSrc={item.iconImgSrc} text={item.text} link={item.link} key={item.id}></Tab>
                ))}
            </div>
            
            <section className="cover_tabs_content_main">
                
                <Switch>
                    {tabsAndComponents.map(item => (
                        <Route path={item.routePath} exact={item.exactPath} key={item.id}>
                            <>{item.component}</>
                        </Route>
                    ))}
                    
                    {additionalComponents.map(item => (
                        <Route path={item.routePath} exact={item.exactPath} key={item.id}>
                            <>{item.component}</>
                        </Route>
                    ))}
                </Switch>
            
            </section>
        </div>
    );
}
 
export default CoverTabsContent;