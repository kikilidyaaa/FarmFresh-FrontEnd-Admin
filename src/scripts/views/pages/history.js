import '../components/history-menu';

const History = {
  async render() {
    return `
      <history-menu></history-menu>
    `;
  },

  async afterRender() {
    await loadSalesDataFromApi();

    async function loadSalesDataFromApi() {
      try {
        const response = await fetch('https://farmfresh-backend.vercel.app/api/history');
        if (!response.ok) {
          throw new Error('Failed to fetch sales data');
        }
        const sales = await response.json();
        
        // Update total penjualan
        const totalSalesElement = document.querySelector(".order-count .texts-container h2");
        if (totalSalesElement) {
          totalSalesElement.textContent = sales.length;
        }

        // Update data di tabel
        const tableBodyElement = document.querySelector(".order-table table tbody");
        if (tableBodyElement) {
          const rows = sales.map((sale, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${sale.name}</td>
              <td>${sale.totalItem}</td>
              <td>${sale.totalPrice}</td>
              <td>${sale.shippingName}</td>
              <td>${sale.address}</td>
            </tr>
          `).join('');
          
          tableBodyElement.innerHTML = rows;
        }
      } catch (error) {
        console.error("Error fetching sales data from API:", error);
        alert("Failed to load sales data. Please try again later.");
      }
    }
  },
};

export default History;