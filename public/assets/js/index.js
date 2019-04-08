$(document).ready(function () {
    $('button#new-order').click(function () {
        console.log('click new order');
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/market",
        })
            .done(function (msg) {
                console.log(msg);
            })
            .fail(function (msg) {
                console.log(msg);
            })
    })
})