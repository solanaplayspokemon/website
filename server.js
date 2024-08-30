const axios = require('axios');

const apiUrl = 'https://frontend-api.pump.fun/coins/A5QHYcSj76eV52gyu5UtoLHY4B7YqvdR28Togne4pump';

let lastMarketCap = null;

async function fetchUsdMarketCap() {
    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data && data.usd_market_cap) {
            const currentMarketCap = data.usd_market_cap;

            if (currentMarketCap !== lastMarketCap) {
                const formattedMarketCap = currentMarketCap.toFixed(2);
                console.log(`Current USD Market Cap: $${formattedMarketCap}`);
                
                // Update the DOM element with the new market cap
                const marketCapElement = document.getElementById('market-cap');
                if (marketCapElement) {
                    marketCapElement.textContent = `$${formattedMarketCap}`;
                }

                lastMarketCap = currentMarketCap;
            }
        } else {
            console.error('Unexpected data format or missing usd_market_cap.');
        }
    } catch (error) {
        console.error('An error occurred while making the request:', error.message);
    }
}

function startPolling() {
    console.log('Starting API polling for USD Market Cap...');
    setInterval(fetchUsdMarketCap, 5000);  // Poll the API every 5 seconds
}

// Start polling when the page loads
window.addEventListener('load', startPolling);
