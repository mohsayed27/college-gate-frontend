import styles from './Overlay.module.css'

const Overlay = ({component, overlayClickHandler}) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.bg} onClick={overlayClickHandler}/>
            <>{component}</>
        </div>
    );
}
 
export default Overlay;