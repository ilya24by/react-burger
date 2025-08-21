import AppHeader from './components/AppHeader';
import BurgerIngredients from './components/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor';
import styles from './App.module.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function App() {

  return (
    <>
      <AppHeader />
      <main>
        <h2 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h2>
        <div className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </div>
      </main>
    </>
  );
}

export default App;
