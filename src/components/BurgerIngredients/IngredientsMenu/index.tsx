import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { setCurrentMenuView } from '../../../services/slices/burgerListMenuSlice';
import { typeTitles } from '../../../utils/api';
import { MenuView } from '../types';

const moveToSection = (sectionTitle: string) => {
    const allH3s = document.querySelectorAll('h3');
    const targetSection = Array.from(allH3s).find(h3 => h3.textContent === sectionTitle);

    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

const BurgerMenu = () => {
    const { currentMenuView } = useAppSelector((state) => state.burgerListMenu);
    const dispatch = useAppDispatch();

    const handleSetCurrentMenuView = (value: MenuView) => {
        dispatch(setCurrentMenuView(value));

        const sectionTitle = typeTitles[value];
        if (sectionTitle) {
            moveToSection(sectionTitle);
        }
    };

    return (
        <div style={{ display: 'flex' }} data-testid="ingredients-menu">
            <Tab value="bun" active={currentMenuView === 'bun'} onClick={() => handleSetCurrentMenuView('bun')}>
                Булки
            </Tab>
            <Tab value="main" active={currentMenuView === 'main'} onClick={() => handleSetCurrentMenuView('main')}>
                Начинки
            </Tab>
            <Tab value="sauce" active={currentMenuView === 'sauce'} onClick={() => handleSetCurrentMenuView('sauce')}>
                Соусы
            </Tab>

        </div>
    )
};

export default BurgerMenu;