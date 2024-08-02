import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cards from './components/CardHolder'

function App() {
  
  const [numCards, updateNumCards] = useState(3);

  const cards = Cards(numCards)

  return (
    <>
      {cards.render}
      <button onClick={cards.shuffle}>Shuffle</button>
    </>
  )
}

export default App
