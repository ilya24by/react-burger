import AppHeader from './components/AppHeader';
import BurgerIngredients from './components/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor';
import Loader from './components/Loader';
import styles from './App.module.css';
import { use, Suspense } from 'react';
import fetchIngredients from './api/burger-api';

function AppContent({ ingredientsPromise }: { ingredientsPromise: Promise<any> }) {
  const ingredients = use(ingredientsPromise);

  return (
    <>
      <AppHeader />
      <main >
        <h2 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h2>
        <div className={styles.main}>
          <BurgerIngredients ingredients={ingredients.data} />
          <BurgerConstructor ingredients={ingredients.data} />
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <AppContent ingredientsPromise={fetchIngredients()} />
    </Suspense>
  );
}

export default App;
