var Chance = require('chance');
var chance = new Chance()

var express = require('express');
var app = express();
var LISTEN_PORT = 8082

app.get('/api', function(req, res) {
    res.send(generateInvoices());
})

app.listen(LISTEN_PORT, function() {
    console.log("Listening on port " + LISTEN_PORT);
});

function generateInvoices() {
    var numberOfInvoices = chance.integer({
        min: 1,
        max: 10
    });
    var invoices = [];
    for (var i = 0; i < numberOfInvoices; i++) {
        var clientFirstName = chance.first();
        var clientLastName = chance.last();
        var creditCardNumber = chance.cc();
        invoices.push({
            firstName: clientFirstName,
            lastName: clientLastName,
            cardNumber: creditCardNumber,
            productsSold: generateProducts()
        });
    }
    return invoices;
}

function generateProducts() {
    var numberOfProducts = chance.integer({
        min: 1,
        max: 3
    });
    var products = [];
    for (var i = 0; i < numberOfProducts; i++) {
        var prodId = chance.ssn();
        var prodName = chance.word();
        var qty = chance.integer({
            min: 1,
            max: 10
        });
        var prodUnitPrice = chance.floating({
            min: 10,
            max: 10000,
            fixed: 2
        });
        var prodTotalPrice = prodUnitPrice * qty;
        products.push({
            productId: prodId,
            productName: prodName,
            quantity: qty,
            productUnitPrice: prodUnitPrice,
            productTotalPrice: prodTotalPrice.toFixed(2)
        });
    }
    return products;
}