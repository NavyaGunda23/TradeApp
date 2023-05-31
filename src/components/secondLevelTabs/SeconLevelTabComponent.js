import './SeconLevelTabComponent.css'

function SeconLevelTabComponent(props){
    return(
        <div className="SecondLevelTabs">
        <ul className="secondLevelnav">
            {props.tabList.map(x => (
                <li onClick={props.onclick} className={x.active ? "active":""}>
                    {x.name}
                </li>
            ))}
        </ul>
        </div>
    )
}
export default SeconLevelTabComponent