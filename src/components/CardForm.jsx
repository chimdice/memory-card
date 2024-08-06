import { useState } from "react";

export default function CardForm (props) {
    const [currentValue, changeValue] = useState(0);

    const click = (event) => {
        event.preventDefault();

        const number = document.querySelector('#cardNums').value;
        props.update(number);

        const game = document.querySelector(".game");
        const form = document.querySelector('form');
        const button = document.querySelector('button');

        game.classList.toggle('hide');
        form.classList.toggle('hide');
        button.classList.toggle('hide');
    }

    return (
        <form className="hide">
            <label htmlFor="cardNums">Number of Cards: </label>
            <input type="number" id='cardNums' min={5} max={20} required/>
            <input type="submit" onClick={click}/>
        </form>
    )
}