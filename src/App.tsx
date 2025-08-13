import AppHeader from './components/AppHeader';
import BurgerIngredients from './components/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor';
import Loader from './components/Loader';
import styles from './App.module.css';
import { useState, useEffect } from 'react';
import fetchIngredients from './api/burger-api';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        setLoading(true);
        const data = await fetchIngredients();
        setIngredients(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadIngredients();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <>
        <AppHeader />
        <div className={styles.error}>Не удалось загрузить ингредиенты, произошла ошибка: {error}</div>
      </>

    )
  }

  return (
    <>
      <AppHeader />
      <main>
        <h2 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h2>
        <div className={styles.main}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </div>
      </main>
    </>
  );
}

export default App;
