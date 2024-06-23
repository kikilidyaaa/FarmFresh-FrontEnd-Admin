class ItemMenu extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      this.innerHTML = `
            <div class="item-content">
                <div class="items-count">
                <div class="item-container" id="totalItems">
                    <div class="icons-container">
                    <i class="fas fa-boxes"></i>
                    </div>
                    <div class="texts-container">
                    <h3>Total Items</h3>
                    <h2>0</h2>
                    </div>
                </div>
        
                <div class="item-container" id="totalSayuran">
                    <div class="icons-container">
                    <i class="fas fa-carrot"></i>
                    </div>
                    <div class="texts-container">
                    <h3>Total Sayuran</h3>
                    <h2>0</h2>
                    </div>
                </div>
        
                <div class="item-container" id="totalBuah">
                    <div class="icons-container">
                    <i class="fas fa-apple-alt"></i>
                    </div>
                    <div class="texts-container">
                    <h3>Total Buah</h3>
                    <h2>0</h2>
                    </div>
                </div>
        
                <div class="item-container" id="totalBumbu">
                    <div class="icons-container">
                    <i class="fas fa-caret-up"></i>
                    </div>
                    <div class="texts-container">
                    <h3>Total Bumbu</h3>
                    <h2>0</h2>
                    </div>
                </div>
                </div>
            </div>
          `;
    }
}

customElements.define("item-menu", ItemMenu);