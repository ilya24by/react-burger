import React from 'react';
import { IngredientsListSectionProps } from './types';
import IngredientsListSectionItem from '../IngredientsListSectionItem';
import styles from './index.module.css';

const IngredientsListSection: React.FC<IngredientsListSectionProps> = ({ ingredients, title }) => {
    return (
        <div className='mt-10'>
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