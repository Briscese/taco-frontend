import api from '../api/axios';
import { FoodItem, FoodDetail } from '../types/foodTypes';

export const fetchFoodList = async (page: number, pageSize: number): Promise<{ items: FoodItem[], total: number }> => {
    const response = await api.get('/list', {
        params: { page, pagesize: pageSize }
    });
    return response.data;
};

export const fetchFoodDetails = async (id: string): Promise<FoodDetail> => {
    const response = await api.get('/get', {
        params: { idfood: id }
    });
    const item = response.data.items[0];
    const nutrients = Object.keys(item)
        .filter(key => typeof item[key] === 'object' && item[key] !== null && 'label' in item[key])
        .map(key => ({
            label: item[key].label,
            value: item[key].value,
            unit: item[key].unit
        }));
    return {
        id: item.id,
        description: item.description,
        category: item.category,
        nutrients
    };
};

export const searchFoods = async (term: string): Promise<FoodItem[]> => {
    try {
        const response = await api.get('/search', {
            params: { term }
        });
        return response.data.items;
    } catch (error) {
        console.error('Erro ao buscar alimentos:', error);
        throw error; // Lançar erro para ser tratado no contexto
    }
};

