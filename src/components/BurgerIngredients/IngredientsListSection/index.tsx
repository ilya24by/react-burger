import React, { useEffect, useRef, RefObject, useCallback } from 'react';
import { IngredientsListSectionProps } from './types';
import IngredientsListSectionItem from '../IngredientsListSectionItem';
import styles from './index.module.css';
import { setCurrentMenuView } from '../../../services/slices/burgerListMenuSlice';
import { useAppDispatch } from '../../../services/hooks';

type MenuView = 'bun' | 'sauce' | 'main';

interface IngredientsListSectionPropsExtended extends IngredientsListSectionProps {
    rootRef: RefObject<HTMLDivElement | null>;
}

const IngredientsListSection = ({ ingredients, title, rootRef }: IngredientsListSectionPropsExtended) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const handleSectionVisible = useCallback((title: string) => {
        const titleToMenuMap: { [key: string]: MenuView } = {
            'Булки': 'bun',
            'Начинки': 'main',
            'Соусы': 'sauce',
        };

        const menuValue = titleToMenuMap[title];
        if (menuValue) {
            dispatch(setCurrentMenuView(menuValue));
        }
    }, [dispatch]);

    useEffect(() => {
        const currentSectionRef = sectionRef.current;
        const currentContainerRef = rootRef.current;

        if (!currentSectionRef || !currentContainerRef) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        handleSectionVisible(title);
                    }
                });
            },
            {
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
                root: currentContainerRef,
                rootMargin: '0px 0px -10% 0px'
            }
        );

        observer.observe(currentSectionRef);

        return () => {
            observer.unobserve(currentSectionRef);
        };
    }, [title, rootRef, handleSectionVisible]);

    return (
        <div ref={sectionRef} className='mt-10'>
            <h3>{title}</h3>
            <div className={styles.ingredients_list_section} >
                {ingredients.map(ingredient => {
                    return (
                        <IngredientsListSectionItem key={ingredient.name} ingredient={ingredient} />
                    )
                })}
            </div>
        </div>
    );
};

export default IngredientsListSection;