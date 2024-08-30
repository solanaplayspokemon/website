const axios = require('axios');
const fs = require('fs');

const apiUrl = 'https://frontend-api.pump.fun/coins/A5QHYcSj76eV52gyu5UtoLHY4B7YqvdR28Togne4pump';
const outputFile = 'indes.html';  // Changed from 'index.html' to 'indes.html'

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
                
                // Generate HTML content
                const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>USD Market Cap</title>
</head>
<body>
    <h1>Current USD Market Cap</h1>
    <p>Market Cap: $${formattedMarketCap}</p>
    <p>Last updated: ${new Date().toLocaleString()}</p>
</body>
</html>
                `;

                // Write to indes.html
                fs.writeFile(outputFile, htmlContent, (err) => {
                    if (err) {
                        console.error('Error writing to file:', err);
                    } else {
                        console.log(`Updated ${outputFile} with new market cap.`);
                    }
                });

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

startPolling();
