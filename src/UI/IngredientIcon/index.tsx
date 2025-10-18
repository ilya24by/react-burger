import styles from './index.module.css';


const IngredientIcon = ({ url, index = 0 }: { url: string, index?: number }) => {
    return (
        <div style={{ zIndex: 100 - index, marginLeft: index === 0 ? 0 : -16 }} className={styles.ingredient_icon_container}>
            <div className={styles.ingredient_icon}>
                <img width={120} height={48} src={url} />
            </div>
        </div>
    );
}

export default IngredientIcon;