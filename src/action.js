import axios from 'axios'
import config from './Utils/config'

async function getExchangeRate() {
    try {
        let url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,SGD,PHP,JPY,EUR'
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

async function getTxns(value){
    try {
        let url = `${config.URL}module=account&action=txlistinternal&address=${value}&startblock=0&endblock=99999999&page=1&offset=20&sort=asc&apikey=${config.API_KEY}`
        const response = await axios(url)
        console.log(response.data.result)
        return response.data.result
    } catch (error) {
        console.error(error);
    }
    
}

function getBalance() {
    let url = `${config.URL}module=transaction&action=getstatus&txhash=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&apikey=${config.API_KEY}`
    axios({
        method:'get',
        url: url,
        responseType:'stream'
    })
    .then(function (response) {
        console.log(response.data.result)
    });
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
    getBalance,
    getETHPrice
};