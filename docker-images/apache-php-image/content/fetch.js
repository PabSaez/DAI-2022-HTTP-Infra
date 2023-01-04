function fetchOnePayment() {
    fetch("/api/").then(res => {
        return res.json();
    }).then(payment => {
        if (payment.length > 0)
            return payment[0].firstName + " " + payment[0].lastName + " card number : " + payment[0].cardNumber;
        else
            return "Personne ne doit payer aujourd'hui !"
    }).then(paymentToDisplay =>  {
        document.getElementsByClassName("payment")[0].textContent = paymentToDisplay;
    });
}

fetchOnePayment();
setInterval(fetchOnePayment, 2000);
