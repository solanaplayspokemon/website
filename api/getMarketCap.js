const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const apiUrl = 'https://frontend-api.pump.fun/coins/A5QHYcSj76eV52gyu5UtoLHY4B7YqvdR28Togne4pump';
    const response = await axios.get(apiUrl);
    
    if (response.data && response.data.usd_market_cap) {
      res.status(200).json({ usd_market_cap: response.data.usd_market_cap });
    } else {
      res.status(500).json({ error: 'Unexpected data format from API' });
    }
  } catch (error) {
    console.error('API request failed:', error);
    res.status(500).json({ error: 'Failed to fetch market cap data' });
  }
};
