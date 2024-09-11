import React from 'react';
import GameBoard from './components/GameBoard';
import './App.css'; // Estilos globais

function App() {
  return (
    <div className="App">
      <h1>Jogo da Memória</h1>
      <h6>...com times de futebol</h6>
      <GameBoard />
    </div>
  );
}

export default App;
