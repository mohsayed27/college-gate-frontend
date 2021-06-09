import styles from './GradeCard.module.css'

/*items = [
    <p>Max: 10<p>, 
    <p>Min: 5<p>, 
    <p>Avg: 7.5<p>
] //DON'T EXCEED 3*/ 
const GradeCard = ({examName, items}) => {
    return (
        <div className="grade_card">
            <p className={`${styles.exam_name} font2 bold`}>{examName}</p>
            <div className={styles.items}>
                {items}
            </div>
        </div>
    );
}
 
export default GradeCard;