// Simulated data that might come from an API
const mockData = [
    { number: 1, imageUrl: 'https://via.placeholder.com/50', name: 'Item 1', marketCap: '$100B', link: '#' },
    { number: 2, imageUrl: 'https://via.placeholder.com/50', name: 'Item 2', marketCap: '$75B', link: '#' },
    { number: 3, imageUrl: 'https://via.placeholder.com/50', name: 'Item 3', marketCap: '$50B', link: '#' },
];

function fetchMarketData() {
    return new Promise((resolve) => {
        // Simulate an API call with a 2-second delay
        setTimeout(() => resolve(mockData), 2000);
    });
}

async function populateTable() {
    const tableBody = document.querySelector('#marketTable tbody');
    tableBody.innerHTML = '<tr><td colspan="4">Loading data...</td></tr>';

    try {
        const data = await fetchMarketData();
        tableBody.innerHTML = ''; // Clear loading message

        data.forEach(item => {
            const row = `
                <tr>
                    <td>${item.number}</td>
                    <td><img src="${item.imageUrl}" alt="${item.name}" width="50" height="50"></td>
                    <td>${item.marketCap}</td>
                    <td><a href="${item.link}">Details</a></td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        tableBody.innerHTML = '<tr><td colspan="4">Error loading data. Please try again later.</td></tr>';
    }
}

// Call this function when the page loads
window.addEventListener('load', populateTable);