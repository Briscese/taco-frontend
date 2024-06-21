import { useContext } from 'react';
import { FoodContext } from '../contexts/FoodContext';

export const useFood = () => {
    return useContext(FoodContext);
};
