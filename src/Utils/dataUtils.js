import numeral from 'numeral'

const unit = require('ethjs-unit');

function formattedCurrency(value, currency) {
    let formattedValue = ''
    let number = numeral(value).format('0,0.00')
    if (currency === 'USD') {
        formattedValue = `$${number}`
    } else if (currency === 'SGD') {
        formattedValue = `SGD ${number}`
    } else if (currency === 'PHP') {
        formattedValue = `₱ ${number}`
    } else if (currency === 'JPY') {
        formattedValue = `¥ ${number}`
    } else if (currency === 'EUR') {
        formattedValue = `€ ${number}`
    } else if (currency === 'KRW') {
        formattedValue = `${number} KRW`
    } else if (currency === 'CNY') {
        formattedValue = `¥ ${number}`
    }
    
    return formattedValue
}

function formatEth(value) {
    return unit.fromWei(value, 'ether')
}

export {
    formattedCurrency,
    formatEth
}