import _ from 'lodash'
import {
    FETCH_COIN_PRICES
} from '../types'

import { takeLatest, put, call } from "redux-saga/effects";
import { Api } from './Api'
import config from '../../Utils/config.json'
import {
    setLoading,
    setCoinPrices
} from '../action'

function* getSagaCoinPrices() {
    try {
        let filterData = []
        yield put(setLoading(true))
        
        let URL = `https://api.nomics.com/v1/prices?key=${config.NOMICS_API}`
        const result = yield call(Api.processAPI, URL);
        _.map(result, val => {
            if(val.currency == 'BTC' ||
            val.currency == 'ETH' ||
            val.currency == 'XRP'){
                filterData.push(val)
            }
        })
        
        yield put(setCoinPrices(filterData))
        yield put(setLoading(false))
    } catch (error) {
        console.error(error);
    }
}

export function* watchChecker() {
  yield takeLatest(FETCH_COIN_PRICES, getSagaCoinPrices );
}