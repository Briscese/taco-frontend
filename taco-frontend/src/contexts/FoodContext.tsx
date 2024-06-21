import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { fetchFoodList, fetchFoodDetails, searchFoods } from '../services/foodService';
import { FoodItem, FoodDetail } from '../types/foodTypes';

interface FoodContextData {
  foods: FoodItem[];
  selectedFood: FoodDetail | null;
  page: number;
  totalPages: number;
  searchTerm: string;
  itemsPerPage: number;
  fetchFoods: (page: number, itemsPerPage: number) => void;
  fetchFood: (id: string) => Promise<void>;
  search: (term: string, page: number, itemsPerPage: number) => void; // Ajustado para incluir página e itens por página
  setPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
}

export const FoodContext = createContext<FoodContextData>({} as FoodContextData);

export const FoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodDetail | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Inicialmente definido como 1
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10); // Definindo 10 itens por página por padrão

  const fetchFoods = async (page: number, itemsPerPage: number) => {
    try {
      const data = await fetchFoodList(page, itemsPerPage); // Buscar alimentos da página específica com o número de itens por página definido
      setFoods(data.items);
      setTotalPages(Math.ceil(data.total / itemsPerPage)); // Atualizar totalPages com base nos resultados da busca
      setPage(page); // Atualizar a página atual
    } catch (error) {
      console.error('Erro ao buscar alimentos:', error);
      // Tratar erro ou feedback ao usuário
    }
  };

  const fetchFood = async (id: string) => {
    const food = await fetchFoodDetails(id);
    setSelectedFood(food);
  };

  const search = async (term: string, page: number, itemsPerPage: number) => {
    setSearchTerm(term);
    try {
      const items = await searchFoods(term); // Realizar a busca com base no termo
      setFoods(items);
      setTotalPages(Math.ceil(items.length / itemsPerPage)); // Calcular o número total de páginas com base nos resultados da busca
      setPage(1); // Resetar a página para 1 após a busca
    } catch (error) {
      console.error('Erro ao buscar alimentos:', error);
      // Tratar erro ou feedback ao usuário
    }
  };

  const setItemPerPage = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    fetchFoods(1, itemsPerPage); // Reiniciar a busca na primeira página com o novo número de itens por página
  };

  useEffect(() => {
    fetchFoods(page, itemsPerPage); // Inicializar a busca ao carregar o contexto
  }, [page, itemsPerPage]);

  return (
    <FoodContext.Provider value={{ foods, selectedFood, page, totalPages, searchTerm, itemsPerPage, fetchFoods, fetchFood, search, setPage, setItemsPerPage }}>
      {children}
    </FoodContext.Provider>
  );
};
