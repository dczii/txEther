import {
    GET_EXCHANGE_RATE,
    GET_ETH_BALANCE,
    GET_TXNS
} from '../types'

import { takeLatest, put, call } from "redux-saga/effects";
import { Api } from './Api'
import config from '../../Utils/config.json'
import {
    setExchangeRate,
    setEthBalance,
    fetchTransactions,
    listTransactions
} from '../action'

function* getSagaExchangeRate() {
    try {
        let URL = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,SGD,PHP,JPY,EUR,KRW,CNY'
        const result = yield call(Api.processAPI, URL);
        yield put(setExchangeRate(result))
    } catch (error) {
        console.error(error);
    }
}

function* getSagaEthBalance(param) {
    try {
        
        let url = `${config.URL}module=account&action=balance&address=${param.payload}&tag=latest&apikey=${config.API_KEY}`
        const result = yield call(Api.processAPI, url);
        console.log('ethbal',result)
        yield put(setEthBalance(result.result))
        yield put(fetchTransactions({
            address: param.payload,
        }))
    } catch (error) {
        console.error(error);
    }
}

function* fetchSagaTransactions(param) {
    try {
        let date = param.payload.sort ? param.payload.sort : 'asc'
        let url = `${config.URL}module=account&action=txlist&address=${param.payload.address}&startblock=0&endblock=99999999&page=1&offset=50&sort=${date}&apikey=${config.API_KEY}`
        const data = yield call(Api.processAPI, url);
        console.log('TXNS',data.result)
        yield put(listTransactions(data.result))
    } catch (error) {
        console.error(error);
    }
}



export function* watchGlobal() {
  yield takeLatest(GET_EXCHANGE_RATE, getSagaExchangeRate );
  yield takeLatest(GET_ETH_BALANCE, getSagaEthBalance);
  yield takeLatest(GET_TXNS, fetchSagaTransactions);
}