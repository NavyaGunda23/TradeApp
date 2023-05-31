import { useEffect, useState, useRef } from 'react';
import TabComponent from './components/tabs/TabComponent';
import TableComponent from './components/table/TableComponent';
import SeconLevelTabComponent from './components/secondLevelTabs/SeconLevelTabComponent';
let tabList = [
  {
    name: "Forex",
    active: true
  },
  {
    name: "Synthetic indices",
    active: false
  },
  {
    name: "Stock Indices",
    active: false
  },
  {
    name: "Cryptocurrencies",
    active: false
  },
  {
    name: "Commodities",
    active: false
  },
]
let subMenuTab = [
  {
    name: "Major Pairs",
    active: false
  },
  {
    name: "Minor Pairs",
    active: false
  },
  {
    name: "Smart FX",
    active: false
  }
]

function MainComponent(props) {
  const [tabsData, setTabData] = useState(tabList);
  const [subMenuData, setSubMenuData] = useState(subMenuTab);
  const [tableData, setTableData] = useState(props.tableData);
  const clearElemnet = useRef(null)
  let filterFirstData = props.tableData;
  /**
   * Function to handle the tab click
   */
  const handleTabClick = (e) => {
    tabList.map(x => x.active = false);
    let slectedIndex = getIndex("name", tabList, e.target.innerText);
    tabList[slectedIndex].active = true;
    setTabData(prevtabsData => {
      return tabList
    })
    getFiletredData("firstLevel");
    clearElemnet.current.click()
  }
  /**
 * Function to handle the second level filters
 */
  const handleSecondLevelFilter = (e) => {
    subMenuTab.map(x => x.active = false);
    let slectedIndex = getIndex("name", subMenuTab, e.target.innerText);
    subMenuTab[slectedIndex].active = true;
    setSubMenuData(subMenuTab);
    getFiletredData("SecondLevel");
  }
  /**
  * Function to return the inadex of element from object
  */
  const getIndex = (comparKey, arrayList, compaisrionText) => {
    return arrayList.findIndex(obj => obj[comparKey] === compaisrionText);
  }
  /**
   * Function which filter the table data based on tab filter
   * @param {String} filterName 
   */
  const getFiletredData = (filterName) => {
    var tableReocrd = props.tableData;
    let first = getIndex("active", tabList, true);
    let second = getIndex("active", subMenuTab, true);
    console.log(tabList, tabsData)
    let mainTabActive = tabList[first].name == "Synthetic indices" ? "Derived" : tabList[first].name;
    if (filterName == "firstLevel") {
      filterFirstData = tableReocrd
        .filter(x => { return x.market_display_name.includes(mainTabActive) })
    } else {
      filterFirstData = props.tableData
        .filter(x => { return x.market_display_name.includes(mainTabActive) })
        .filter(x => { return x.submarket_display_name.includes(subMenuTab[second].name) })
    }
    setTableData(prevtableData => {
      return filterFirstData
    })
  }
  /**
   * Function to clear the second level filters
   */
  const handleClearAll = () => {
    subMenuTab.map(x => x.active = false);
    setSubMenuData(subMenuTab);
    getFiletredData("firstLevel")
  }

  useEffect(() => {
    setTableData(tableData)
  }, [filterFirstData, tableData])

  return (
    <>
      <TabComponent tabList={tabsData} onclick={e => handleTabClick(e)} />
      <div className='secondLevelFilters'>
        <SeconLevelTabComponent tabList={subMenuData} onclick={e => handleSecondLevelFilter(e)} />
        <a onClick={handleClearAll} ref={clearElemnet} className='clearAll'>Clear All</a>
      </div>

      <TableComponent tableData={tableData} imagesList={props.imagesList} />
    </>
  )
}
export default MainComponent;