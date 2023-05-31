import "./TabComponent.css"
function TabComponent(props){
    return(
        <div className="Tabs">
        <ul className="nav">
            {props.tabList.map(x => (
                <li onClick={props.onclick} className={x.active ? "active":""}>
                    {x.name}
                </li>
            ))}
        </ul>
        </div>
    )
}
export default TabComponent