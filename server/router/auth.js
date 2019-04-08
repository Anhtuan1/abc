
const BFX = require('bitfinex-api-node');

module.exports = {
    authentication: function (API_KEY, API_SECRET) {
        return new BFX({
            apiKey: API_KEY,
            apiSecret: API_SECRET,

            ws: {
                autoReconnect: true,
                seqAudit: true,
                packetWDDelay: 10 * 1000
            }
        });
    }
}


