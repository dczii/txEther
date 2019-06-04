import {
    GET_EXCHANGE_RATE,
    SET_EXCHANGE_RATE,
    GET_ETH_BALANCE,
    SET_ETH_BALANCE,
    LIST_TXNS
} from '../types'

  const initialState = {
      loading: false,
      showError: false,
      ethBalance: 0,
      rates: [],
      addressTxns: []
  }

export default (state = initialState, action) => {
  switch(action.type) {

        case GET_EXCHANGE_RATE:
            return { ...state, loading: true }
        case SET_EXCHANGE_RATE:
            return { ...state, loading: false, rates: action.payload }
      
        case GET_ETH_BALANCE:
            return { ...state, loading: true }
        case SET_ETH_BALANCE:
            return { ...state, loading: false, ethBalance: action.payload }
        case LIST_TXNS:
            return { ...state, loading: false, addressTxns: action.payload }

      default:
        return state;  
  }
}