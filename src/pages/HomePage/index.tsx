
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./index.module.css";
import BurgerConstructor from "../../components/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients";

const HomePage = () => {
    return (
        <main>
            <h2 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h2>
            <div className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            </div>
        </main>
    );
};

export default HomePage;