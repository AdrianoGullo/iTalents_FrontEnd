import React, { useState, useEffect } from 'react';
import Card from './Card';
import './css/GameBoard.css';

const temas = {
  times: [
    { id: 1, imagem: '/assets/images/palmeiras.png' },
    { id: 2, imagem: '/assets/images/flamengo.png' },
    { id: 3, imagem: '/assets/images/arsenal.png' },
    { id: 4, imagem: '/assets/images/city.png' },
    { id: 5, imagem: '/assets/images/realmadrid.png' },
    { id: 6, imagem: '/assets/images/chelsea.png' },
    { id: 7, imagem: '/assets/images/barcelona.png' },
    { id: 8, imagem: '/assets/images/juventus.png' },
  ],
};


const GameBoard = () => {
  const [cartas, setCartas] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);
  const [paresEncontrados, setParesEncontrados] = useState([]);
  const [tentativas, setTentativas] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [jogoConcluido, setJogoConcluido] = useState(false);
  const [iniciouJogo, setIniciouJogo] = useState(false); // Novo estado para controlar o início do jogo


  // Função para embaralhar as cartas
  const embaralharCartas = () => {
    const cartasTimes = [...temas.times];
    const cartasDoTema = [...cartasTimes, ...cartasTimes];
    cartasDoTema.sort(() => Math.random() - 0.5); // Embaralhando as cartas
    setCartas(cartasDoTema.map((carta, index) => ({ ...carta, id: index, virada: false }))); // Começam viradas para baixo
  };


  // Função chamada quando uma carta é clicada
  const handleCardClick = (id) => {
    if (selecionadas.length === 2 || jogoConcluido) return;

    const novaSelecao = [...selecionadas, id];
    setSelecionadas(novaSelecao);

    // duas cartas selecionadas, verifica se é par
    if (novaSelecao.length === 2) {
      setTentativas(prevTentativas => prevTentativas + 1);
      verificarPar(novaSelecao);
    }
  };

  const verificarPar = (novaSelecao) => {
    const [primeira, segunda] = novaSelecao;
    const carta1 = cartas.find((carta) => carta.id === primeira);
    const carta2 = cartas.find((carta) => carta.id === segunda);

    if (carta1.imagem === carta2.imagem) {
      setParesEncontrados([...paresEncontrados, carta1.id, carta2.id]);
      setAcertos(prevAcertos => prevAcertos + 1);
    } else {
      setTimeout(() => {
        setCartas(prevCartas =>
          prevCartas.map(carta =>
            carta.id === primeira || carta.id === segunda
              ? { ...carta, virada: false }
              : carta
          )
        );
      }, 1000);
    }

    // limpa a seleção após a verificar
    setTimeout(() => {
      setSelecionadas([]);
    }, 1000);
  };

  // Verifica se o jogo foi concluído
  useEffect(() => {
    if (paresEncontrados.length === cartas.length) {
      setJogoConcluido(true);
    }
  }, [paresEncontrados, cartas]);

  // Função para reiniciar o jogo
  const reiniciarJogo = () => {
    setParesEncontrados([]);
    setSelecionadas([]);
    setJogoConcluido(false);
    embaralharCartas();
    setTentativas(0);
    setAcertos(0);
  };

  // Função para iniciar o jogo
  const iniciarJogo = () => {
    setJogoConcluido(false);
    setIniciouJogo(true);
    embaralharCartas();
  };

  return (
    <div>
      {!iniciouJogo ? (
        <div className="start-screen">
          <button onClick={iniciarJogo}>Começar Jogo</button>
        </div>
      ) : (
        <>
          {jogoConcluido ? (
            <div className="game-completion">
              <h2>Parabéns! Você completou o jogo!</h2>
              <p>Você encontrou todos os pares em {tentativas} tentativas.</p>
              <button onClick={reiniciarJogo}>Reiniciar Jogo</button>
            </div>
          ) : (
            <div className="game-board">
              {cartas.map((carta) => (
                <Card
                  key={carta.id}
                  id={carta.id}
                  imagem={carta.imagem}
                  virada={carta.virada || selecionadas.includes(carta.id) || paresEncontrados.includes(carta.id)}
                  handleClick={handleCardClick}
                />
              ))}
            </div>
          )}
          <div className="game-stats">
            <div className="badge">
              <p>Tentativas: {tentativas}</p>
            </div>
            <div className="badge">
              <p>Acertos: {acertos}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GameBoard;