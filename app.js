const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var path = require('path');
// var ea = require('./server/ea');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '4000mb' }));


app.get('/', function (req, res) {
 console.log(req.query);
  
if(req.query.symbol &&req.query.amount){

	const BFX = require('bitfinex-api-node');
	const { Order } = require('bfx-api-node-models');
	const auth = require('./server/router/auth');;

	const API_KEY = ''; // ==> paste key here
	const API_SECRET = ''; // ==? paste secret key here

	// validate API
	const bfx = auth.authentication(API_KEY, API_SECRET);

	// REST API
	const rest = bfx.rest(2, { transform: true });
	console.log('/market');
	var ws = bfx.ws(2);

	ws.on('error', (err) => {
		//console.log(err);
	})

	ws.on('open', () => {
		// debug('open')
		console.log('on ws open');
		ws.auth()
	})

	ws.once('auth', () => {
		

		// Build new order
		const o = new Order({
			cid: Date.now(),
			symbol: req.query.symbol,
			// price: '5200',
			amount: req.query.amount,
			type: Order.type.MARKET,
			// tif: '2019-04-08 11:00:00',
		}, ws)


		o.registerListeners()

		o.on('update', () => {
			//console.log(`order updated: ${o.serialize()}`)
		})

		o.on('close', () => {
			//console.log(`order closed: ${o.status}`);
			ws.close()
		})

		o.submit().then(() => {
			console.log(`submitted order ${o.id}`)
		}).catch((err) => {
			//console.log(err)
			ws.close()
		})
	})

	ws.open();

	module.exports = router;
	
}
	
	
	
})

//var market = require('./server/router/market');
//var test = require('./server/router/test');
//app.use('/market', market);
//app.use('/test', test);
app.listen(3000, function () {
  console.log('listen to port 3000')
})
