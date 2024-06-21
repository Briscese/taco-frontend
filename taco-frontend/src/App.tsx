import React from 'react';
import './App.css';
import SearchFood from './components/SearchFood';
import { FoodProvider } from './contexts/FoodContext';

const App: React.FC = () => {
    return (
        <FoodProvider>
            <div className="App">
                <header className="App-header">
                    <h1>Busca de Alimentos</h1>
                </header>
                <SearchFood />
            </div>
        </FoodProvider>
    );
}

export default App;
