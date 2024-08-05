import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cards from './components/CardHolder'

function App() {
  
  const [numCards, updateNumCards] = useState(10);

  const cards = Cards(numCards)

  return (
    <>
      <h1>Memory Game</h1>
      <h2>Current Score: {cards.current}</h2>
      <h2>High Score: {cards.total}</h2>
      {cards.render}
    </>
  )
}

export default App
