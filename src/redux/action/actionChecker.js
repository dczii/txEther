import {
    SET_COIN_PRICES,
    FETCH_COIN_PRICES
  } from '../types'
  
export const fetchCoinPrices = () => {
    return {
        type: FETCH_COIN_PRICES,
    }
}

export const setCoinPrices = (data) => {
    return {
        type: SET_COIN_PRICES,
        payload: data
    }
}