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

    return ({
        shuffle:shuffleCards,
        render:(
        <>
            <div className="holder" style={style}>
                {cards.map(value => <Card key={value} number={value}/>)}
            </div>
        </>
        )
    })

}