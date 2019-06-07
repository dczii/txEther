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
        let URL2 = `https://api.nomics.com/v1/currencies?key=${config.NOMICS_API}&ids=BTC,ETH,XRP,LTC,XMR,DASH,NEO&attributes=id,name,logo_url,original_symbol`
        let result = yield call(Api.processAPI, URL);
        let result2 = yield call(Api.processAPI, URL2);

        _.map(result, val => {
            if(val.currency == 'BTC' ||
            val.currency == 'ETH' ||
            val.currency == 'LTC' ||
            val.currency == 'XMR' ||
            val.currency == 'NEO' ||
            val.currency == 'DASH' ||
            val.currency == 'XRP'){
                let coinDetails = _.find(result2, {'id': val.currency})
                filterData.push({title: val.currency, data: [{...coinDetails, ...val}]})
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