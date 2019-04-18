var express = require('express');
var router = express.Router();
var path = require('path');

const BFX = require('bitfinex-api-node');
const { Order } = require('bfx-api-node-models');
const auth = require('./auth');

const API_KEY = '7xswgmNNXA3WbCCvuj9N5IVWxXHc8LukFTXVtbFh08M'; // ==> paste key here
const API_SECRET = 'lkUnfKnuLHXK7H7AqhpYDhJUVc62RKEuFaBP4FtPTvb'; // ==? paste secret key here

// validate API
const bfx = auth.authentication(API_KEY, API_SECRET);

// REST API
const rest = bfx.rest(2, { transform: true });
console.log('/market');
var ws = bfx.ws(2);

ws.on('error', (err) => {
    console.log(err);
})

ws.on('open', () => {
    // debug('open')
    console.log('on ws open');
    ws.auth()
})

ws.once('auth', () => {
    console.log('authenticated');

    // Build new order
    const o = new Order({
        cid: Date.now(),
        symbol: 'tBTCUSD',
        // price: '5200',
        amount: -0.01,
        type: Order.type.MARKET,
        // tif: '2019-04-08 11:00:00',
    }, ws)


    o.registerListeners()

    o.on('update', () => {
        console.log(`order updated: ${o.serialize()}`)
    })

    o.on('close', () => {
        console.log(`order closed: ${o.status}`);
        ws.close()
    })

    o.submit().then(() => {
        console.log(`submitted order ${o.id}`)
    }).catch((err) => {
        console.log(err)
        ws.close()
    })
})

ws.open();

module.exports = router;
