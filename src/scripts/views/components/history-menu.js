class HistoryMenu extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="history-container">
        <div class="order-count">
          <div class="item-container">
            <div class="icons-container">
              <i class="fas fa-users"></i>
            </div>
            <div class="texts-container">
              <h3>Total Penjualan</h3>
              <h2>0</h2>
            </div>
          </div>
        </div>

        <div class="order-container">
          <div class="top-section">
            <h2>All Items</h2>
            <!-- <div class="search-bar">
                <input type="text" placeholder="Search...">
                <button><i class="fas fa-search"></i></button>
            </div> -->
          </div>
          
          <div class="order-table">
            <table style="width:100%">
              <thead>
                <tr>
                  <th style="width:10%">No</th>
                  <th style="width:20%">Name</th>
                  <th style="width:10%">Total Item</th>
                  <th style="width:20%">Total Price</th>
                  <th style="width:20%">Shipping Name</th>
                  <th style="width:20%">Address</th>
                </tr>
              </thead>
              <tbody>
                <!-- Rows will be inserted here by JavaScript -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("history-menu", HistoryMenu);
