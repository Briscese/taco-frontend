import React from 'react';
import SearchFood from '../components/SearchFood';

const FoodPage: React.FC = () => {
    return (
        <div>
            <h1>Buscar Alimentos</h1>
            <SearchFood />
        </div>
    );
};

export default FoodPage;

export {}; // Adicione esta linha para garantir que o arquivo seja tratado como um módulo
