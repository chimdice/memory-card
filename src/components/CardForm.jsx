import { useState } from "react";

export default function CardForm (props) {

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
        props.total(0);
    }

    const style = {
        padding: '5px 10px 5px 10px',
        margin: '10px'
    }

    return (
        <form className="hide">
            <label htmlFor="cardNums">Number of Cards: </label>
            <input type="number" id='cardNums' min={5} max={20} style={style} required/>
            <input type="submit" onClick={click} style={style}/>
        </form>
    )
}