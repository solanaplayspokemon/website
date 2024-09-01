async function fetchUsdMarketCap() {
    try {
        const response = await axios.get('/api/getMarketCap');
        const data = response.data;

        if (data && data.usd_market_cap) {
            const formattedMarketCap = data.usd_market_cap.toFixed(2);
            document.getElementById('market-cap').textContent = `$${formattedMarketCap}`;
            document.getElementById('last-updated').textContent = new Date().toLocaleString();
            document.getElementById('status').textContent = 'Data fetched successfully';
        } else {
            throw new Error('Unexpected data format');
        }
    } catch (error) {
        console.error('An error occurred while making the request:', error);
        document.getElementById('market-cap').textContent = 'Error fetching data';
        document.getElementById('status').textContent = `Error: ${error.message}. Check console for more details.`;
    }
}

// Fetch initially and then every 5 seconds
fetchUsdMarketCap();
setInterval(fetchUsdMarketCap, 5000);
