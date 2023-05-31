import { useEffect, useState } from "react";
import ButtonComponent from '../button/ButtonComponent';
import './TableComponent.css';
import Chart from '../charts/Chart'

function TableComponent (props){
    const [tableData, setTableData] = useState(props.tableData)
    const [headerData, setHeaderData] = useState()
    const sortingTable = (nextSort) => {
        let sortedProducts;
        if(nextSort == "up"){
            sortedProducts = tableData.sort((a, b) => (a[headerData] > b[headerData]) ? 1 : -1 )
        }else if(nextSort == "down"){
            sortedProducts = tableData.sort((a, b) => (a[headerData] < b[headerData]) ? 1 : -1 )
        }else{
            sortedProducts = tableData.sort((a, b) => (a["display_order"] > b["display_order"]) ? 1 : -1 )
        }
        setTableData(prevtableData => {
            return sortedProducts
        })
    }
    const sortTypes = {
        up: {
            class: 'sort-up'
        },
        down: {
            class: 'sort-down'
        },
        default: {
            class: 'sort'
        }
    };
   


    /**
     * Function which update the sorting icon and filter the table data
     */
    const onSortChange = (e) => {
		const  currentSort1 = e.target.closest('th').getAttribute("sort_type");
		let nextSort;
        let headerdata = e.target.closest('th').getAttribute("header_name");
		if (currentSort1 === 'down') nextSort = 'up';
		else if (currentSort1 === 'up') nextSort = 'default';
		else if (currentSort1 === 'default') nextSort = 'down';
        e.target.closest('th').setAttribute("sort_type",nextSort);
        e.target.querySelector("i").setAttribute("class",'fa fa-'+sortTypes[nextSort].class)
        setHeaderData(prevheaderData => {
            return headerdata
        })
        sortingTable(nextSort);
	};
    useEffect(() => {
        loadTable();
    },[props.tableData])
    const loadTable = () =>{
        setTableData(props.tableData);
    }
    return(
        <table className="table-border">
            <thead>
                <tr>
                    <th header_name="display_name" sort_type="default" onClick={e => onSortChange(e)}>Name<span className="sortringIcon"><i className="fa fa-sort" /></span>
                                </th>
                    <th header_name="lastPrice" sort_type="default" onClick={e => onSortChange(e)}>Last Price<span className="sortringIcon"><i className="fa fa-sort" /></span>
								</th>
                    <th header_name="oneDayChnage" sort_type="default" onClick={e => onSortChange(e)}>24th Change<span className="sortringIcon"><i className="fa fa-sort" /></span></th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
            {tableData.length > 0  ? 
            tableData.map(p => (
							<tr>
								<td>
                                    <span className="displaynameIcon"><img src={props.imagesList["ic-"+p.symbol.toUpperCase()+".svg"]}/></span>
                                <span className="displaynameText">{p.display_name}</span>
                                </td>
								<td>{p.lastPrice}</td>
                                <td><span className="priceHistory">{p.oneDayChnage}</span></td>
                                <td>
                                 <Chart data={p.chartData}/>
                                </td>
                                <td><ButtonComponent btnTile="Trade" /></td>
							</tr>
						))
            : 
            <tr ><td colSpan="5" className="text-center">No Data Exist</td></tr>
            }
            </tbody>
        </table>
    )
}

export default TableComponent;