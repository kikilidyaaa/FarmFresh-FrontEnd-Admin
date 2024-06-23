import "../components/item-menu";

const Items = {
  currentPage: 1,
  itemsPerPage: 10,
  items: [],

  async render() {
    return `
      <item-menu id="itemMenu"></item-menu>
      <div class="items-container">
        <div class="top-section">
          <h2>All Items</h2>
          <button id="addItemBtn" class="add-items">+ Add New Items</button>
        </div>
        
        <div class="items-table">
          <table style="width: 100%">
            <thead>
              <tr>
                <th style="width: 5%">No</th>
                <th style="width: 20%">Name</th>
                <th style="width: 20%">Price</th>
                <th style="width: 10%">Rate</th>
                <th style="width: 20%">Type</th>
                <th style="width: 20%">Category</th>
                <th style="width: 20%">Image</th>
              </tr>
            </thead>
            <tbody id="table-body">
              <!-- Rows will be added here dynamically -->
            </tbody>
          </table>
          <div id="pagination">
            <button id="prevBtn" disabled>Previous</button>
            <button id="nextBtn">Next</button>
          </div>
        </div>
  
        <!-- Modal for adding new item -->
        <div id="addModal" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Add New Item</h2><br>
            <form id="addItemForm">
              <label for="name">Name:</label>
              <input type="text" id="name" name="name" required>
              <label for="price">Price:</label>
              <input type="text" id="price" name="price" required>
              <label for="rate">Rate:</label>
              <input type="text" id="rate" name="rate" required>
              <label for="type">Type:</label>
              <select id="type" name="type" required>
                <option value="buah">Buah</option>
                <option value="sayuran">Sayuran</option>
                <option value="bumbu dapur">Bumbu Dapur</option>
              </select>
              <label for="category">Category:</label>
              <select id="category" name="category" required>
                <option value="organik">Organik</option>
                <option value="non-organik">Non-Organik</option>
              </select>
              <label for="description">Description:</label>
              <textarea id="description" name="description"></textarea><br>
              <label for="image">Choose an image:</label>
              <input type="file" id="image" name="image" accept="image/*" required />
              <br><br>
              <button type="submit">Add Item</button>
            </form>
          </div>
        </div>
      </div>
    `;
  },
  
  async afterRender() {
    await this.loadItemsFromApi();
    this.addPaginationListeners();
    this.setupAddItemModal();
    this.setupItemMenu();
  },

  async loadItemsFromApi() {
    try {
      const response = await fetch('https://farmfresh-backend.vercel.app/api/products');
      if (!response.ok) {
        throw new Error('Gagal mengambil data produk');
      }
      const data = await response.json();

      this.items = data.map(item => ({
        ...item,
        name: capitalizeFirstLetter(item.name),
        type: capitalizeFirstLetter(item.type),
        category: capitalizeFirstLetter(item.category)
      })).sort((a, b) => a.name.localeCompare(b.name));
      
      this.renderItems();
    } catch (error) {
      alert("Gagal mengambil data produk. Silakan coba lagi.");
    }
  },
  
  renderItems() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
  
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const itemsToShow = this.items.slice(startIndex, endIndex);
  
    itemsToShow.forEach((item, index) => {
      const row = `
        <tr>
          <td>${startIndex + index + 1}</td>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td>${item.rate}</td>
          <td>${item.type}</td>
          <td>${item.category}</td>
          <td><img src="${item.image}" alt="${item.name}" style="width: 100px; height: 70px;"></td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
  
    if (this.currentPage === 1) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }
  
    if (endIndex >= this.items.length) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }
    this.updateTotalCounts();
  },  

  setupItemMenu() {
    const itemMenu = document.getElementById("itemMenu");

    itemMenu.addEventListener("updateTotals", () => {
      this.updateTotalCounts();
    });
  },

  updateTotalCounts() {
    const totalItemsCount = this.items.length;
    const totalSayuranCount = this.items.filter(item => item.type === 'Sayuran').length;
    const totalBuahCount = this.items.filter(item => item.type === 'Buah').length;
    const totalBumbuCount = this.items.filter(item => item.type === 'Bumbu Dapur').length;

    document.getElementById("totalItems").querySelector("h2").textContent = totalItemsCount;
    document.getElementById("totalSayuran").querySelector("h2").textContent = totalSayuranCount;
    document.getElementById("totalBuah").querySelector("h2").textContent = totalBuahCount;
    document.getElementById("totalBumbu").querySelector("h2").textContent = totalBumbuCount;
  },

  addPaginationListeners() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    prevBtn.addEventListener("click", () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.renderItems();
      }
    });

    nextBtn.addEventListener("click", () => {
      const startIndex = this.currentPage * this.itemsPerPage;
      if (startIndex < this.items.length) {
        this.currentPage++;
        this.renderItems();
      }
    });
  },

  setupAddItemModal() {
    const addItemBtn = document.getElementById("addItemBtn");
    const addModal = document.getElementById("addModal");
    const closeModal = addModal.querySelector(".close");
    const addItemForm = document.getElementById("addItemForm");
  
    addItemBtn.addEventListener("click", () => {
      addModal.style.display = "block";
    });
  
    closeModal.addEventListener("click", () => {
      addModal.style.display = "none";
    });
  
    window.addEventListener("click", (event) => {
      if (event.target === addModal) {
        addModal.style.display = "none";
      }
    });

    addItemForm.addEventListener("submit", async (event) => {
      event.preventDefault();
    
      const name = addItemForm.elements.name.value.trim();
      const price = addItemForm.elements.price.value.trim();
      const rate = addItemForm.elements.rate.value.trim();
      const type = addItemForm.elements.type.value.trim();
      const category = addItemForm.elements.category.value.trim();
      const description = addItemForm.elements.description.value.trim();
      const imageFile = addItemForm.elements.image.files[0];
    
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('rate', rate);
        formData.append('type', type);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('image', imageFile);
    
        const response = await fetch('https://farmfresh-backend.vercel.app/api/products', {
          method: 'POST',
          body: formData
        });
    
        if (!response.ok) {
          throw new Error('Gagal menambahkan item.');
        }
    
        alert("Item berhasil ditambahkan.");
        addModal.style.display = "none";
        await this.loadItemsFromApi();
        this.renderItems();
    
        const itemMenu = document.getElementById("itemMenu");
        itemMenu.dispatchEvent(new Event("updateTotals"));
      } catch (error) {
        console.error("Kesalahan saat menambahkan item:", error);
        alert("Gagal menambahkan item.");
      }
    });
  },  
};

function capitalizeFirstLetter(string) {
  return string.replace(/\b\w/g, char => char.toUpperCase());
}

export default Items;