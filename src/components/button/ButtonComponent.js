import './ButtonComponent.css'
function ButtonComponent(props){
    return(
        <button
        className="btn-primary"
        >
            {props.btnTile}
        </button>
    )
}
export default ButtonComponent;