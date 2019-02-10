import numeral from 'numeral'

const unit = require('ethjs-unit');

function formattedCurrency(value) {
    let number = numeral(value).format('0,0.00')
    return `$${number}`
}

function formatEth(value) {
    return unit.fromWei(value, 'ether')
}

export {
    formattedCurrency,
    formatEth
}