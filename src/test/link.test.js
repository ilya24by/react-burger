// link.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

import { Link } from './link';


it('Нажатие на кнопку вызывает корректный alert', () => {
    window.alert = jest.fn();

    // Рендерим ссылку в переменную
    const { container } = render(
        <Link title="Рецепт пельменей" url="https://pelmeni.gov" />
    );
    // Имитируем нажатие на ссылку
    fireEvent.click(container.querySelector('a'));

    // Проверяем, что alert сработал с правильным текстом предупреждения
    expect(window.alert).toHaveBeenCalledWith('Ура! Пельмени!');
});

it('Ссылка рендерится без ошибок', () => {
    const tree = renderer
        .create(<Link title="Рецепт пельменей" url="https://pelmeni.gov" />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});