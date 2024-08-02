
export default function Card (props) {

    return (
        <>
            <div id="card" className={"c"+props.number}>
                <p>card {props.number}</p>
            </div>
        </>
    )

}