import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cards from './components/CardHolder'

function App() {
  
  const [numCards, updateNumCards] = useState(15);

  return (
    <>
      <Cards />
    </>
  )
}

export default App
