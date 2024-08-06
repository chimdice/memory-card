import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cards from './components/CardHolder'
import CardForm from './components/CardForm'

function App() {
  
  const [numCards, updateNumCards] = useState(10);

  const cards = Cards(numCards)

  const change = () => {
    const game = document.querySelector(".game");
    const form = document.querySelector('form');
    const button = document.querySelector('button');

    game.classList.toggle('hide');
    form.classList.toggle('hide');
    button.classList.toggle('hide');
  }

  return (
    <>
      <h1>Memory Game</h1>
      <div className="game">
        <h2>Current Score: {cards.current}</h2>
        <h2>High Score: {cards.total}</h2>
        {cards.render}
      </div>
      <CardForm update={updateNumCards}/>
      <button onClick={change}>Change Number of Cards!</button>
    </>
  )
}

export default App
