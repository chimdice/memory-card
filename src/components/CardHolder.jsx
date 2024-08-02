import Card from "./Card"

export default function Cards ({totalCards = 10}) {

    const style = {
        fontSize: 50,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '10px'
    }

    const numCards = []
    for (let i = 0; i < totalCards; i++) {
        numCards.push(i)
    }

    return (
        <>
            <div className="holder" style={style}>
                {numCards.map(value => <Card key={value} number={value}/>)}
            </div>
        </>
    )

}