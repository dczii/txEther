import {
    SET_LOADING,
    GET_EXCHANGE_RATE,
    SET_EXCHANGE_RATE,
    GET_ETH_BALANCE,
    SET_ETH_BALANCE,
    GET_TXNS,
    LIST_TXNS,
    GET_ETH_PRICE,
    SET_ETH_PRICE
} from '../types'

export const setLoading = data => {
  return {
    type: SET_LOADING,
  }
}

export const getExchangeRate = () => {
  return {
    type: GET_EXCHANGE_RATE,
  }
}

export const setExchangeRate = (data) => {
  return {
    type: SET_EXCHANGE_RATE,
    payload: data
  }
}

export const fetchEthBalance = (payload) => {
  return {
    type: GET_ETH_BALANCE,
    payload
  }
}

export const setEthBalance = (payload) => {
    return {
        type: SET_ETH_BALANCE,
        payload
    }
}

export const fetchTransactions = (payload) => {
    return {
        type: GET_TXNS,
        payload
    }
}

export const listTransactions = (payload) => {
    return {
        type: LIST_TXNS,
        payload
    }
}
