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
    const [currentScore, updateCurrentScore] = useState(0);
    const [totalScore, updateTotalScore] = useState(0);

    //initalize array
    useEffect(()=>{
        if (effectRan.current === false) {
            for (let i = 0; i < totalCards; i++) {
                updateNumCards(old => [...old, i])
            }

            return () => {
                effectRan.current = true;
            }
        }
    }, [])
    

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


    const clickCard = () => {
        updateCurrentScore(old => old +1);
        console.log(currentScore, totalScore);
        if (currentScore >= totalScore) {
            updateTotalScore(old => old +1);
        }
        shuffleCards();
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