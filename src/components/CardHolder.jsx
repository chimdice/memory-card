import { useState, useEffect, useRef } from "react"
import Card from "./Card"

export default function Cards (totalCards) {

    const effectRan = useRef(false);

    const style = {
        fontSize: 50,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '10px'
    }

    const [cards, updateNumCards] = useState([]);
    const [selectedCards, changeSelectedCards] = useState({});
    const [currentScore, updateCurrentScore] = useState(0);
    const [totalScore, updateTotalScore] = useState(0);
    const [game, resetGame] = useState(0);
    const [reset, updateReset] = useState(false)

    useEffect(()=>{
        //new game
        if (reset) {
            updateNumCards([]);
            changeSelectedCards({});
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
            }
            console.log('hi')
        }

         //initalize
        if (effectRan.current === false) {
            updateNumCards([]);
            changeSelectedCards({});
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
            }
            updateReset(true)

            return () => {
                effectRan.current = true;
            }

        }
    }, [game])
    

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
                {cards.map(value => <Card key={value} number={value} click={clickCard}/>)}
            </div>
        </>
        )
    })

}