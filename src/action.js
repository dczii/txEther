import axios from 'axios'
import config from './Utils/config'

function getAxios(url) {
    axios({
        method:'get',
        url: url,
        responseType:'stream'
    })
    .then(function (response) {
        return response
    });
}

function getLogs(){
    let url = `http://api.etherscan.io/api?module=account&action=txlist&address=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&startblock=0&endblock=99999999&sort=asc&apikey=NRBKRGEHIURWGRFC7CSUM1PVPICNP6Y15Y`
    // console.log(url)
    axios({
        method:'get',
        url: url,
    })
    .then(function (response) {
        console.log('res=====',response)
    });
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
    getAxios,
    getLogs,
    getBalance,
    getETHPrice
};