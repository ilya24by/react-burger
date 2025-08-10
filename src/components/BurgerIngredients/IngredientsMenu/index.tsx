import React from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerMenu = () => {
    const [current, setCurrent] = React.useState('one')
    return (
        <div style={{ display: 'flex' }}>
            <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="souses" active={current === 'souses'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="inside" active={current === 'inside'} onClick={setCurrent}>
                Начинка
            </Tab>
        </div>
    )
};

export default BurgerMenu;