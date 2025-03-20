export default function Die(props) {
    return <button className={props.isHeld ? "held" : null} onClick={() => props.handleClick(props.id)}>{props.value}</button>
}