
export default function Card (props) {

    return (
        <>
            <div id="card" className={"c"+props.number} onClick={props.click}>
                <p>card {props.number}</p>
            </div>
        </>
    )

}