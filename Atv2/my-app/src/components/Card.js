import React from 'react';
import './css/Card.css';

const Card = ({ id, imagem, virada, handleClick }) => {
  return (
    <div className={`card ${virada ? 'virada' : ''}`} onClick={() => !virada && handleClick(id)}>
      {virada ? (
        <img src={imagem} alt="Card" className="card-image" />
      ) : (
        <div className="card-back"> {/* Fundo customizado */}
          {}
        </div>
      )}
    </div>
  );
};

export default Card;
