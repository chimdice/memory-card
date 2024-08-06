
export default function Card (props) {

    const style = {
        backgroundImage: "url("+props.pokemon+")"
    }

    return (
        <>
            <div id="card" className={"c"+props.number} onClick={props.click} style={style}>
            </div>
        </>
    )

}