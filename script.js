document.addEventListener('DOMContentLoaded', function() {
    fetchCurrentPrice();
});

document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const satoshis = document.getElementById('satoshis').value;
    const btc = satoshis / 100000000;
    const currentPrice = parseFloat(document.getElementById('price').dataset.price);
    const valueInUSD = btc * currentPrice;
    document.getElementById('result').innerText = `${satoshis} satoshis is equal to ${btc} BTC and worth approximately $${valueInUSD.toFixed(2)} USD`;
});

document.getElementById('btcForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const btc = document.getElementById('btc').value;
    const satoshis = btc * 100000000;
    const currentPrice = parseFloat(document.getElementById('price').dataset.price);
    const valueInUSD = btc * currentPrice;
    document.getElementById('result').innerText = `${btc} BTC is equal to ${satoshis} satoshis and worth approximately $${valueInUSD.toFixed(2)} USD`;
});

function fetchCurrentPrice() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            const price = data.bitcoin.usd;
            document.getElementById('price').innerText = `Current BTC Price: $${price} USD`;
            document.getElementById('price').dataset.price = price;
        })
        .catch(error => {
            console.error('Error fetching BTC price:', error);
            document.getElementById('price').innerText = 'Error fetching BTC price';
        });
}