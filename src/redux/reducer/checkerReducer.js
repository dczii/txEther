import {
    SET_COIN_PRICES
} from '../types'

  const initialState = {
      priceList: []
  }

export default (state = initialState, action) => {
  switch(action.type) {

    case SET_COIN_PRICES:
        return { ...state, loading: false, priceList: action.payload }

      default:
        return state;  
  }
}