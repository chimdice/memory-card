import { useState, useEffect, useRef } from "react"
import Card from "./Card"

export default function Cards (totalCards) {

    const effectRan = useRef(false);

    const style = {
        fontSize: 50,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '15px',
        padding: '15px'
    }

    const [cards, updateNumCards] = useState([]);
    const [selectedCards, changeSelectedCards] = useState({});
    const [gifs, updateGifs] = useState([])

    const [currentScore, updateCurrentScore] = useState(0);
    const [totalScore, updateTotalScore] = useState(0);
    const [game, resetGame] = useState(0);
    const [reset, updateReset] = useState(false)

    const generateRandomNumber = () => {
        return Math.floor(Math.random()*1000)
    }

    async function fetchCards (number) {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+number, {mode:'cors'});
        const json = await response.json();
        const url = json.sprites.front_default;
        console.log(url)
        if (gifs.includes(url)) {
            const num = generateRandomNumber();
            fetchCards(num)
        } else {
            console.log(url)
            updateGifs(old => [...old, url])
        }
    }

    useEffect(()=>{
        //new game
        if (reset) {
            updateNumCards([]);
            changeSelectedCards({});
            updateGifs([]);
            updateCurrentScore(0);
            for (let i = 0; i < totalCards; i++) {
                updateNumCards(old => [...old, i])
                const cardKey = 'c'+i;
                const element = {};
                element[cardKey] = false;

                changeSelectedCards(old => ({
                    ...old,
                    ...element
                }))

                const num = generateRandomNumber();
                fetchCards(num);
            }
            console.log('hi')
        }

         //initalize
        if (effectRan.current === false) {
            updateNumCards([]);
            changeSelectedCards({});
            updateGifs([]);
            updateCurrentScore(0);
            for (let i = 0; i < totalCards; i++) {
                updateNumCards(old => [...old, i])
                const cardKey = 'c'+i;
                const element = {};
                element[cardKey] = false;

                changeSelectedCards(old => ({
                    ...old,
                    ...element
                }))

                const num = generateRandomNumber();
                fetchCards(num);
            }
            updateReset(true)

            return () => {
                effectRan.current = true;
            }

        }
    }, [game, totalCards])
    

    const shuffleCards = () => {
        const tempArray = [...cards]
        const newArray = [];

        let size = totalCards;
        while (size > 0) {
            const pos = Math.floor(Math.random()*size);
            newArray.push(tempArray[pos]);
            tempArray.splice(pos, 1);
            size -= 1;
        }

        updateNumCards(newArray);
    }


    const clickCard = (event) => {

        let selected;
        if (event.target.nodeName === 'P') {
            selected = event.target.parentNode.className;
        } else {
            selected = event.target.className;
        }

        if (! selectedCards[selected]){
            updateCurrentScore(old => old +1);
            if (currentScore >= totalScore) {
                updateTotalScore(old => old +1);
            }

            shuffleCards();

            const newelement = {};
            newelement[selected] = true;
            changeSelectedCards( old => ({
                ...old,
                ...newelement
            }));
        } else {
            resetGame(old => old + 1);
        }
        
    }

    return ({
        current:currentScore,
        total: totalScore,
        render:(
        <>
            <div className="holder" style={style}>
                {cards.map(value => <Card key={value} number={value} click={clickCard} pokemon={gifs[value]}/>)}
            </div>
        </>
        )
    })

}