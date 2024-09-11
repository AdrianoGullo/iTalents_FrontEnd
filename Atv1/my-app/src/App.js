import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [lastOperation, setLastOperation] = useState(false); // Flag para verificar se a última ação foi uma operação

  // Função para converter graus em radianos
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const handleClick = (value) => {
    // Se a última ação foi uma operação, substitua o input pelo resultado
    if (lastOperation) {
      setInput(result + value);
      setLastOperation(false); // Resetar flag
    } else {
      setInput(input + value);
    }
  };

  const deleteLast = () => {
    setInput(input.slice(0, -1));
  };

  // Função para arredondar o resultado para 4 algoritmos significativos
  const roundResult = (num) => {
    if (num === Infinity || isNaN(num)) {
      return 'Error';
    }
    return parseFloat(num.toPrecision(4));
  };

  // Função para calcular a expressão
  const calculate = () => {
    try {
      // Substituir funções científicas no input antes de avaliar
      let parsedInput = input
        .replace(/sin\(([^)]+)\)/g, (_, p1) => `Math.sin(toRadians(${p1}))`)
        .replace(/cos\(([^)]+)\)/g, (_, p1) => `Math.cos(toRadians(${p1}))`)
        .replace(/tan\(([^)]+)\)/g, (_, p1) => `Math.tan(toRadians(${p1}))`)
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/exp\(/g, 'Math.exp(')
        .replace(/\^/g, '**'); // Substitui ^ por ** (exponenciação)

      // Avalia a expressão final
      const resultInRadians = eval(parsedInput);
      setResult(roundResult(resultInRadians));
      setInput(''); // Limpar input após cálculo
      setLastOperation(true); // Definir flag para a próxima operação
    } catch (e) {
      setResult('Error');
    }
  };

  const handleScientific = (func) => {
    setInput(input + `${func}(`); // Adiciona a função científica com parênteses abertos
    setLastOperation(false); // Resetar flag
  };

  const clear = () => {
    setInput('');
    setResult('');
    setLastOperation(false); // Resetar flag
  };

  // Efeito para ajustar a posição do texto no display conforme necessário
  useEffect(() => {
    const inputElement = document.querySelector('.display-input');
    if (inputElement) {
      // Ajusta a posição do texto no display para mostrar o texto mais recente
      const maxScroll = Math.max(0, inputElement.scrollWidth - inputElement.clientWidth);
      inputElement.style.transform = `translateX(-${maxScroll}px)`;
    }
  }, [input]);

  return (
    <div className="calculator">
      <div className="title">
        <h1>Calculadora</h1>
      </div>
      <div className="display">
        <input type="text" value={input || result} disabled className="display-input" />
        <div className="result">{result ? `= ${result}` : ''}</div>
      </div>
      <div className="buttons">
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={clear} className="clear">C</button>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('+')}>+</button>
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('-')}>-</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={() => handleClick('/')}>/</button>
        <button onClick={() => handleClick('*')}>*</button>

        {/* Parênteses */}
        <button onClick={() => handleClick('(')}>(</button>
        <button onClick={() => handleClick(')')}>)</button>

        {/* Funções científicas */}
        <button onClick={() => handleScientific('sin')}>sin</button>
        <button onClick={() => handleScientific('cos')}>cos</button>
        <button onClick={() => handleScientific('tan')}>tan</button>
        <button onClick={() => handleScientific('ln')}>ln</button>
        <button onClick={() => handleScientific('sqrt')}>√</button>
        <button onClick={() => handleScientific('exp')}>exp</button>
        <button onClick={() => handleClick('^')}>^</button>

        {/* Botão para apagar o último caractere */}
        <button onClick={deleteLast} className="delete">Del</button>
        <button onClick={calculate} className="calculate">=</button>
      </div>
      <div className="footer">
        <p>@adriano_gullo</p>
      </div>
    </div>
  );
};

export default App;
