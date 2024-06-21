import React, { useState } from 'react';
import { useFood } from '../hooks/useFood'; // Assuming useFood hook is imported correctly

const SearchFood: React.FC = () => {
  const {
    foods,
    selectedFood,
    page,
    totalPages,
    fetchFoods,
    fetchFood,
    search,
    setPage,
    itemsPerPage, // Adjusted to use itemsPerPage from context
  } = useFood();
  const [term, setTerm] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    search(term, 1, itemsPerPage); // Chamada para search com a página 1 e itens por página
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      fetchFoods(newPage, itemsPerPage); // Fetch foods for the new page
    }
  };

  // Render food items
  const renderFoodItems = () => {
    return (
      <ul>
        {foods.map((item) => (
          <li key={item.id} onClick={() => fetchFood(item.id)}>
            {item.description}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Digite um termo de busca"
        />
        <button type="submit">Buscar</button>
      </form>

      {foods.length > 0 && (
        <div>
          {renderFoodItems()}

          {selectedFood && (
            <div>
              <h2>{selectedFood.description}</h2>
              <p>Categoria: {selectedFood.category.name}</p>
              <ul>
                {selectedFood.nutrients.map((nutrient, index) => (
                  <li key={index}>
                    {nutrient.label}: {nutrient.value} {nutrient.unit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
              Anterior
            </button>
            <span>
              Página {page} de {totalPages}
            </span>
            <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFood;
