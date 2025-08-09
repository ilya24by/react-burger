import data from '../../../utils/data'
import ConstructorListItem from "../ConstructorListItem";
import styles from './index.module.css';

const ConstructorList = () => {
    return (
        <div className={styles.constructor_list}>
            {
                data.map((item, index) => (
                    <ConstructorListItem key={item.name} type={!index ? 'top' : index === data.length - 1 ? 'bottom' : undefined} item={item} />
                ))
            }
        </div>
    );
};

export default ConstructorList;