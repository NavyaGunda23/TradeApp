import './App.css';
import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic.js';
import { useEffect, useState } from 'react';
import MainComponent from './MainComponent'
import LoadingSpinner from './components/loadingSpinner/LoadingSpinner';

function App() {

  const [maindata, setMainData] = useState([]);
  const [imagesList, setImagesList]= useState( );
var W3CWebSocket = require('websocket').w3cwebsocket;
const connection = new W3CWebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');
const api        = new DerivAPIBasic({ connection });


// Currently gets all available symbols.
const active_symbols_request = {
  active_symbols: 'brief',
  product_type: 'basic',
};
/**
 * 
 * @param {Object} res
 *        api response of active symbols which may contains error/success code based on api call
 * @returns {Object}
 *         history of individual tickhistory 
 */
const ticksHistoryResponse = async (res) => {
  const data = JSON.parse(res.data);
  let history;
  connection.removeEventListener('message', ticksHistoryResponse, false);
  if (data.error !== undefined) {
    console.log('Error : ', data.error.message);
    await api.disconnect();
  }
  if (data.msg_type === 'history') {
    history = data.history;
  }
  return history;
};


/**
 * 
 * @param {Object} res
 *        api response of active symbols which may contains error/success code based on api call
 * @returns {Object}
 *         api response of active symbols
 */
const activeSymbolsResponse = async (res) => {
  const data = JSON.parse(res.data);
  connection.removeEventListener('message', activeSymbolsResponse, false);
  let activeSymbols;
  if (data.error !== undefined) {
    console.log('Error : ', data.error?.message);
    await api.disconnect();
  }
  if (data.msg_type === 'active_symbols') {
    activeSymbols = data.active_symbols
  }
  return activeSymbols;
};

/**
 * Function to import all the images from local folder
 */
const importAllImages = (r) =>{
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

/**
 * Function -- make a api call to active symbols on page loads
 * once the active symbols is recived we will trigger one more api which get tickhistory, lastPrice, 24 horus chnage
 */
useEffect(() => {
  // api.onClose();
  let images = importAllImages(require.context('./assests', false, /\.(gif|jpe?g|svg)$/));
  setImagesList(images);
  (async () => {
      connection.addEventListener('message', activeSymbolsResponse);
      const sample1  = await api.activeSymbols(active_symbols_request);
      connection.addEventListener('message', ticksHistoryResponse);
      const ticks_history_request = {
        ticks_history: "R_50",
        count: 10,
        end: "latest",
        start: 1,
        style: "ticks",
      };
      const sample2 = await api.ticksHistory(ticks_history_request)
      for(var i =0;i<sample1.active_symbols.length;i++){
        //commented below code since if we wnat to make different api call for each symbol
        // const ticks_history_request = {
        //   ticks_history: sample1.active_symbols[i].symbol,
        //   count: 10,
        //   end: "latest",
        //   start: 1,
        //   style: "ticks",
        // };
        // const sample2 = await api.ticksHistory(ticks_history_request)
        sample1.active_symbols[i]['chartData'] = {price: sample2.history.prices};
        sample1.active_symbols[i]['lastPrice'] = sample2.history.prices[0];
        sample1.active_symbols[i]['oneDayChnage'] = parseFloat(sample2.history.prices[0]) - parseFloat(sample2.history.prices[9]);
      }
      setMainData(sample1.active_symbols);
      console.log(sample1.active_symbol)
  api.onClose();
  })();

},[1]);


  return (
    <div className="App" >
      {maindata.length > 0 ? 
      <MainComponent tableData={maindata} imagesList={imagesList} /> //Load the main components which has tabs abd table content
      :
      <LoadingSpinner/> //display loading spinner until data gets loaded in background
      }
    </div>
  );
}

export default App;
