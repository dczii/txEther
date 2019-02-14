import axios from 'axios'
import config from './Utils/config'

async function getExchangeRate() {
    try {
        let url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,SGD,PHP,JPY,EUR,KRW,CNY'
        const response = await axios(url)
        return response.data
    } catch (error) {
        console.error(error);
    }
}

async function getEthBalance(address){
    try {
        let url = `${config.URL}module=account&action=balance&address=${address}&tag=latest&apikey=${config.API_KEY}`
        const ethBalance = await axios(url)
        return ethBalance.data.result
    } catch (error) {
        console.error(error);
    }
}

async function getTxns(value, sortDate){
    try {
        let date = sortDate ? sortDate : 'asc'
        let url = `${config.URL}module=account&action=txlist&address=${value}&startblock=0&endblock=99999999&page=1&offset=50&sort=${date}&apikey=${config.API_KEY}`
        const response = await axios(url)
        return response.data.result
    } catch (error) {
        console.error(error);
    }
    
}

function getETHPrice() {
    let url = `${config.URL}module=stats&action=ethprice&apikey=${config.API_KEY}`
    axios({
        method:'get',
        url: url,
        responseType:'stream'
    })
    .then(function (response) {
        console.log(response.data.result)
    });
}

export {
    getExchangeRate,
    getEthBalance,
    getTxns,
    getETHPrice
};